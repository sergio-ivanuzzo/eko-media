import { useCallback, useContext } from "react";

import csvToJson from "~/parsers/csvToJson";

import { DataContext } from "~/providers/DataProvider";
import { IUseDataResponse } from "~/hooks/useData/types";
import { IData, IDataProviderContext, IItem } from "~/providers/DataProvider/types";

import {
    CATEGORIES,
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
        date: selectedDate,
        category: selectedCategory,
        media: selectedMedia,
        topCategories,
        setTopCategories,
    } = useContext<IDataProviderContext<IItem>>(DataContext);

    // we need month and year to detect which directory contains files with data
    const getMonthAndYear = useCallback(() => {
        const month: string = selectedDate.toLocaleString("en-us", { month: "short" }).toLocaleLowerCase();
        const year = selectedDate.getFullYear().toString();

        return [ month, year ];
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

    const loadTopCategories = useCallback(async (): Promise<Array<string>> => {
        const [ month, year ] = getMonthAndYear();
        let result: string[] = [];

        if (month && year) {
            const topCategories = await load(ROOT_DIR, "month_to_5categories.json");
            result = topCategories["month_to_5categories"][0][`${year}_${month}`] as string[];
            console.log(topCategories["month_to_5categories"][0][`${year}_${month}`]);
        }

        return result || [];
    }, [ getMonthAndYear ]);

    const loadAll = useCallback(async (): Promise<void> => {
        const [ month, year ] = getMonthAndYear();

        if (month && year) {
            const dirPath = `${ROOT_DIR}/${year}/${month}`;

            const topCategories = await loadTopCategories()
            setTopCategories(topCategories);

            let items = await Promise.all(Object.values(TYPES).map((type) => {
                return Promise.all(topCategories.concat("all", "profiles").map(async (category) => {
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

    const getDataset = useCallback((type: TYPES, category: string = selectedCategory): IItem[] => {
        const filteredData: IData<IItem> = filter(type, category);
        const [ month, year ] = getMonthAndYear();
        const key = `${type}_${category}_${month}_${year}`;

        return (key in filteredData) ? filteredData[key] : [];
    }, [ filter, getMonthAndYear, selectedCategory ]);

    return {
        data,
        loadAll,
        getDataset,
        topCategories,
    }
};

export default useData;
