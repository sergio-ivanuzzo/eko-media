import React, { createContext, useState } from "react";

import { CATEGORIES } from "~/common/constants";
import { IData, IDataProviderContext, IDataProviderProps } from "./types";

export const DataContext = createContext<IDataProviderContext>({
    data: {},
    setData: () => undefined,
    date: new Date(),
    setDate: () => undefined,
    category: CATEGORIES.ALL,
    setCategory: () => undefined,
    media: [ "all" ],
    setMedia: () => undefined
});

const DataProvider = ({ children }: IDataProviderProps): JSX.Element => {
    const [ data, setData ] = useState<IData>({});
    const [ date, setDate ] = useState<Date>(new Date("2021-02"));
    const [ category, setCategory ] = useState<CATEGORIES>(CATEGORIES.ALL);
    const [ media, setMedia ] = useState<string[]>([ "all" ]);

    return (
        <DataContext.Provider value={{ data, setData, date, setDate, category, setCategory, media, setMedia }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
