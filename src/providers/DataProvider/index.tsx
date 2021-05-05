import React, { createContext, useState } from "react";

import { CATEGORIES } from "~/common/constants";
import { IData, IDataProviderContext, IDataProviderProps, IItem } from "./types";

export const DataContext = createContext<IDataProviderContext<IItem>>({
    data: {},
    setData: () => undefined,
    date: new Date(),
    setDate: () => undefined,
    category: CATEGORIES.ALL,
    setCategory: () => undefined,
    // TODO: refactor "all" into const
    media: [ "all" ],
    setMedia: () => undefined
});

const DataProvider = ({ children }: IDataProviderProps): JSX.Element => {
    const [ data, setData ] = useState<IData<IItem>>({});
    // TODO: remove 2021-02 const, this one for test only (since we have data for 2021-02)
    const [ date, setDate ] = useState<Date>(new Date("2021-02"));
    const [ category, setCategory ] = useState<CATEGORIES>(CATEGORIES.ALL);
    // TODO: refactor "all" into const
    const [ media, setMedia ] = useState<string[]>([ "all" ]);
    
    const context = { 
        data, 
        setData, 
        date, 
        setDate, 
        category, 
        setCategory, 
        media, 
        setMedia
    };

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
