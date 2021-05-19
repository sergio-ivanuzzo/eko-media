import { useIntl } from "react-intl";
import { useCallback, useContext, useEffect, useMemo } from "react";

import csvToJson from "~/parsers/csvToJson";

import { DataContext } from "~/providers/DataProvider";
import { IUseDataResponse } from "~/hooks/useData/types";
import { IData, IDataProviderContext, IItem } from "~/providers/DataProvider/types";

import {
    FILE_EXTENSION,
    FILTER_BY_CATEGORY_INDEXES,
    FILTER_FLAGS,
    FILTER_MASK_MAP,
    ROOT_DIR,
    TYPES,
} from "~/common/constants";

const useData = (): IUseDataResponse => {

    const {
        data,
        setData,
        date: selectedDate, // filter value
        category, // filter value
        setCategory,
        media, // filter value
        setMedia,
        // all categories for current month
        allCategories,
        setAllCategories,
    } = useContext<IDataProviderContext<IItem>>(DataContext);

    const { formatMessage } = useIntl();
    const itemAll = formatMessage({ id: "select.default_select_all" });

    const selectedCategory = useMemo(() => {
        return category === itemAll ? "all" : category;
    }, [ category ]);

    const selectedMedia = useMemo(() => {
        return media.includes(itemAll) ? [ "all" ] : media;
    }, [ media ]);

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
                return { [name]: csvToJson(responseText) };
            } else if (extension === FILE_EXTENSION.JSON) {
                return { [name]: [ JSON.parse(responseText) ] };
            }
        }

        return {};

    }, []);

    const loadAll = useCallback(async (): Promise<void> => {
        const { month, year } = getMonthAndYear();

        if (month && year) {
            const dirPath = `${ROOT_DIR}/${year}/${month}`;

            let items = await Promise.all(Object.values(TYPES).map((type) => {
                // TODO: refactor all and profiles
                return Promise.all(allCategories.concat("all", "profiles").map(async (category) => {
                    const filename = `${type}_${category}_${month}_${year}`;
                    // we don't know 100% which extension filename has, try both
                    const csv = await load(dirPath, `${filename}.${FILE_EXTENSION.CSV}`);
                    const json = await load(dirPath, `${filename}.${FILE_EXTENSION.JSON}`);

                    return { ...csv, ...json };
                }));
            }));

            items = items.map((item) => Object.assign({}, ...item));

            setData(Object.assign({}, ...items));
        }
    }, [ load, getMonthAndYear, setData ]);

    const filter = useCallback((type: TYPES, category: string): IData<IItem> => {

        const flags: number = FILTER_MASK_MAP[type];

        const filteredData: IData<IItem> = Object.keys(data)
            .filter((key: string) => key.startsWith(`${type}_${category}`))
            .reduce((result: IData<IItem>, key: string) => {
                result[key] = [ ...data[key] ];
                return result;
            }, {});

        if (flags & FILTER_FLAGS.BY_MEDIA) {
            Object.keys(filteredData).forEach((key: string) => {
                const items = filteredData[key];
                // TODO: refactor ALL media into const
                filteredData[key] = (selectedMedia.includes("all")) ? items : items
                    .filter((dataItem: IItem) => selectedMedia.some((mediaItem) => mediaItem in dataItem));
            })
        }

        if (flags & FILTER_FLAGS.BY_CATEGORY) {
            Object.keys(filteredData).forEach((key: string) => {
                const items = filteredData[key];
                filteredData[key] = (selectedCategory === "all") ? items : items
                    .filter((dataItem: IItem) =>
                        FILTER_BY_CATEGORY_INDEXES.some((index: string) => dataItem[index] === selectedCategory)
                    );
            })
        }

        return filteredData;
    }, [ data, selectedCategory, selectedMedia ]);

    useEffect(() => {
        const { month, year } = getMonthAndYear();
        const categoriesData = data[`category_all_${month}_${year}`];

        if (categoriesData) {
            const categories = categoriesData.map((item: IItem) => item.category);
            setAllCategories(categories as string[]);
        }
    }, [ data, getMonthAndYear ]);

    const getDataset = useCallback((type: TYPES, category: string = selectedCategory): IItem[] => {
        const filteredData: IData<IItem> = filter(type, category);
        const { month, year } = getMonthAndYear();
        const key = `${type}_${category}_${month}_${year}`;

        return (key in filteredData) ? filteredData[key] : [];
    }, [ filter, getMonthAndYear, selectedCategory ]);

    return {
        data,
        loadAll,
        getDataset,
        allCategories: allCategories,
        filteredCategories: selectedCategory === "all" ? allCategories : [ selectedCategory ],
        setCategory,
        filteredMedia: selectedMedia,
        setMedia,
    }
};

export default useData;
