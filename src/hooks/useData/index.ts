import { useCallback, useContext, useEffect, useState } from "react";

import csvToJson from "~/parsers/csvToJson";

import { DataContext } from "~/providers/DataProvider";
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
import { IFilterParams, IUseDataResponse } from "~/hooks/useData/types";

const useData = (): IUseDataResponse => {

    const { data, setData } = useContext<IDataProviderContext>(DataContext);

    const load = useCallback(async (dirPath: string, filename: string): Promise<void> => {
        // load file and parse it into json object or array of json objects (for csv only)
        const [ name, extension ] = filename.split(".");

        const response = await fetch(`./${dirPath}/${filename}`);
        const responseText = await response.text();

        if (response.status === 200) {
            if (extension === FILE_EXTENSION.CSV) {
                setData((prevState: IData) => ({
                    ...prevState,
                    [name]: csvToJson(responseText),
                }));
            } else if (extension === FILE_EXTENSION.JSON) {
                setData((prevState: IData) => ({
                    ...prevState,
                    [name]: [ JSON.parse(responseText) ],
                }));
            }
        } else {
            // since we try to load files with all combinations of type and category in name
            // we just ignore error if filename starts with combination not exists
        }
    }, [ setData ]);

    // we use date here to detect directory with files to load
    const loadAll = useCallback(async (selectedDate: Date): Promise<void> => {
        const month: string = selectedDate.toLocaleString("en-us", { month: "short" }).toLocaleLowerCase();
        const year = selectedDate.getFullYear().toString();

        if (month && year) {
            const dirPath = `${ROOT_DIR}/${year}/${month}`;

            Object.values(TYPES).forEach(type => {
                Object.values(CATEGORIES).forEach(async category => {
                    const filename = `${type}_${category}_${month}_${year}`;
                    // we don't know 100% which extension filename has, try both
                    await load(dirPath, `${filename}.${FILE_EXTENSION.CSV}`);
                    await load(dirPath, `${filename}.${FILE_EXTENSION.JSON}`);
                })
            })
        }
    }, [ load ]);

    // TODO: refactor "all" into const
    const filter = (type: TYPES, { category = "all", media = [ "all" ] }: IFilterParams): IData => {
        const flags: number = FILTER_MASK_MAP[type];

        const filteredData: IData = Object.keys(data)
            .filter((key: string) => key.startsWith(type))
            .reduce((result: IData, key: string) => {
                result[key] = data[key];
                return result;
            }, {});

        if (flags & FILTER_FLAGS.BY_MEDIA) {
            // detect all items where key equals to media name
            Object.keys(filteredData).forEach((key: string) => {
                const items = filteredData[key];
                filteredData[key] = items.filter(
                    (dataItem: IItem) => media.some(mediaItem => mediaItem in dataItem)
                );
            })
        }

        if (flags & FILTER_FLAGS.BY_CATEGORY) {
            // detect all items where category field equals to filter category
            // FILTER_BY_CATEGORY_INDEXES contains all fields which stores category
            // one of the FILTER_BY_CATEGORY_INDEXES names will be used
            Object.keys(filteredData).forEach((key: string) => {
                const items = filteredData[key];
                filteredData[key] = items
                    .filter((dataItem: IItem) =>
                        FILTER_BY_CATEGORY_INDEXES.some((index: string) => dataItem[index] === category)
                    );
            })
        }

        return filteredData;
    };

    return {
        data,
        loadAll,
        filter,
    }
};

export default useData;
