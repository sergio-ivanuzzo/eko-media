import { useIntl } from "react-intl";
import { useCallback, useContext, useMemo } from "react";

import csvToJson from "~/parsers/csvToJson";
import formatString from "~/helpers/formatString";
import useNotifyError from "~/hooks/useNotifyError";

import { DataContext } from "~/providers/DataProvider";
import { IUseDataResponse } from "~/hooks/useData/types";

import {
    CATEGORIES_MAP,
    CATEGORY_KEYS,
    FILE_EXTENSION,
    FILTER_FLAGS,
    FILTER_MASK_MAP,
    ROOT_DIR,
    SHOULD_LOAD_ONLY_ONCE,
    TYPES,
} from "~/common/constants";

const useData = (): IUseDataResponse => {

    const {
        data,
        setData,
        date: selectedDate, // filter value
        category: selectedCategory, // filter value
        setCategory,
        media: selectedMedia, // filter value
        setMedia,
        // all categories for current month
        topCategories,
        setTopCategories,
        // all media for current month
        allMedia,
        setAllMedia,
    } = useContext<IDataProviderContext<IItem>>(DataContext);

    const { formatMessage } = useIntl();

    const { catchErrors } = useNotifyError();

    // we need month and year to detect which directory contains files with data
    const getMonthAndYear = useCallback(() => {
        const month = selectedDate.toLocaleString("en-US", { month: "2-digit" });
        const year = selectedDate.getFullYear().toString();

        return {
            month,
            year,
        };
    }, [ selectedDate ]);

    const load = useCallback(async (dirPath: string, filename: string): Promise<IData<IItem>> => {
        // load file and parse it into object or array of objects (for csv only)
        const [ name, extension ] = filename.split(".");

        const response = await fetch(`./${dirPath}/${filename}`);
        const responseText = await response.text();

        if (response.status === 200) {
            if (extension === FILE_EXTENSION.CSV) {
                return {
                    [name]: await catchErrors(
                        () => csvToJson(responseText),
                        formatString({
                            initial: formatMessage({ id: "error_label.file_name" }),
                            params: [ `${name}.${FILE_EXTENSION.CSV}` ]
                        }),
                    )
                };
            } else if (extension === FILE_EXTENSION.JSON) {
                return { [name]: [ JSON.parse(responseText) ] };
            }
        }

        return {};

    }, []);

    const loadCategoriesAndMedia = useCallback(async (): Promise<[IData<IItem>, string[], string[]]> => {
        const { month, year } = getMonthAndYear();
        const dirPath = `${ROOT_DIR}/${year}/${month}`;
        const result = await load(dirPath, `category_all_${month}_${year}.${FILE_EXTENSION.CSV}`);

        const categoriesData = result[`category_all_${month}_${year}`];
        let categories: string[] = [];
        let allMedia: string[] = [];

        if (categoriesData) {
            categories = categoriesData.map((item) => item.category.toString());
            allMedia = Object.keys(categoriesData[0])
                .filter((key: string) => !CATEGORY_KEYS.includes(key));
        }

        setTopCategories(categories as string[]);
        setAllMedia(allMedia);
        setMedia(allMedia);

        return [ result, categories, allMedia ];
    }, [ load, getMonthAndYear ]);

    const loadAll = useCallback(async (): Promise<void> => {
        const { month, year } = getMonthAndYear();
        const dirPath = `${ROOT_DIR}/${year}/${month}`;

        // reset
        setData({});

        const [ categoryItem, parsedCategories ] = await loadCategoriesAndMedia();

        // for now there only 2 json files (with only "all" category)
        const jsonDataAll = await Promise.all([ TYPES.NETWORK, TYPES.CONNECTION ].map(async (type) => {
            const filename = `${type}_all_${month}_${year}`;
            return await load(dirPath, `${filename}.${FILE_EXTENSION.JSON}`);
        }));

        // csv files with only "all" category
        const csvDataAll = await Promise.all([ TYPES.SPHERE, TYPES.WORD_CLOUD ].map(async (type) => {
            const filename = `${type}_all_${month}_${year}`;
            return await load(dirPath, `${filename}.${FILE_EXTENSION.CSV}`);
        }));

        const csvDataCategorized = await Promise.all([ TYPES.POLITICIAN, TYPES.EXPERT, TYPES.TOPIC ].map((type) => {
            return Promise.all(parsedCategories.concat("all", "profiles").map(async (category) => {
                const categoryKey = Object.keys(CATEGORIES_MAP).find(
                    (key: string) => CATEGORIES_MAP[key] === category
                ) || category;

                const filename = `${type}_${categoryKey}_${month}_${year}`;
                return await load(dirPath, `${filename}.${FILE_EXTENSION.CSV}`);
            }))
        }));

        const expertsProfiles = await load(ROOT_DIR, "experts_profiles.csv");

        const items = {
            ...categoryItem,
            ...jsonDataAll.reduce((acc, item) => ({
                ...acc,
                ...item
            }), {}),
            ...csvDataAll.reduce((acc, item) => ({
                ...acc,
                ...item
            }), {}),
            ...csvDataCategorized.reduce((acc, dataset) => ({
                ...acc,
                ...dataset.reduce((sub, item) => ({
                    ...sub,
                    ...item
                }), {})
            }), {}),
            ...expertsProfiles,
        };

        setData(items);
    }, [ load, getMonthAndYear, setData ]);

    const getDataset = useCallback((type: TYPES, category = "all", withDate = true): IItem[] => {
        const flags: number = `${type}_${category}` in FILTER_MASK_MAP
            ? FILTER_MASK_MAP[`${type}_${category}`]
            : FILTER_MASK_MAP[type];

        const filteredData: IData<IItem> = Object.keys(data)
            .filter((key: string) => key.startsWith(`${type}_${category}`))
            .reduce((result: IData<IItem>, key: string) => {
                result[key] = [ ...data[key] ];
                return result;
            }, {});

        if (flags & FILTER_FLAGS.BY_MEDIA) {
            Object.keys(filteredData).forEach((key: string) => {
                const items = filteredData[key];

                const allKeys = Object.keys(items[0]);
                const nonMediaKeys = allKeys.filter(
                    (key) => !allMedia.some((mediaName) => key.includes(mediaName))
                );
                const selectedMediaKeys = selectedMedia.includes("all")
                    ? allKeys
                    : allKeys.filter((key) => selectedMedia.some((mediaName) => key.includes(mediaName)));

                filteredData[key] = items.map((item) => {
                    return nonMediaKeys.concat(selectedMediaKeys).reduce((acc, key) => ({
                        ...acc,
                        [key]: item[key]
                    }), {});
                });
            })
        }

        if (flags & FILTER_FLAGS.BY_CATEGORY) {
            Object.keys(filteredData).forEach((key: string) => {
                const items = filteredData[key];
                filteredData[key] = (selectedCategory === "all") ? items : items
                    .filter((dataItem: IItem) =>
                        CATEGORY_KEYS.some(
                            (index: string) => {
                                const category = (dataItem[index]?.toString() ?? "").toLowerCase();
                                return category === CATEGORIES_MAP[selectedCategory]?.toLowerCase();
                            }
                        )
                    );
            })
        }
        const { month, year } = getMonthAndYear();

        let key = `${type}_${selectedCategory}`;
        let fallbackKey = `${type}_${category}`;

        if (withDate) {
            key = `${key}_${month}_${year}`;
            fallbackKey = `${fallbackKey}_${month}_${year}`;
        }

        return (key in filteredData) ? filteredData[key] : filteredData[fallbackKey] || [];
    }, [ data, getMonthAndYear, selectedCategory, selectedMedia ]);

    const selectedCategories = useMemo(
        () => selectedCategory === "all" ? topCategories : [ CATEGORIES_MAP[selectedCategory] ],
        [ selectedCategory, topCategories ]
    );

    const isDataLoaded = useMemo((): boolean => {
        return !!Object.keys(data).filter((key) => !SHOULD_LOAD_ONLY_ONCE.includes(key)).length;
    }, [ data ]);

    return {
        data,
        loadAll,
        getDataset,
        topCategories,
        selectedCategories,
        selectedCategory,
        setCategory,
        selectedMedia,
        setMedia,
        allMedia,
        isDataLoaded,
        getMonthAndYear,
    }
};

export default useData;
