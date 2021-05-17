import { useIntl } from "react-intl";
import React, { createContext, useState } from "react";

import { IData, IDataProviderContext, IDataProviderProps, IItem } from "./types";

export const DataContext = createContext<IDataProviderContext<IItem>>({
    data: {},
    setData: () => undefined,
    date: new Date(),
    setDate: () => undefined,
    category: "all",
    setCategory: () => undefined,
    // TODO: refactor "all" into const
    media: [ "all" ],
    setMedia: () => undefined,
    allCategories: [],
    setAllCategories: () => undefined
});

const DataProvider = ({ children }: IDataProviderProps): JSX.Element => {
    const [ data, setData ] = useState<IData<IItem>>({});
    // TODO: remove 2021-02 const, this one for test only (since we have data for 2021-02)
    const [ date, setDate ] = useState<Date>(new Date("2021-02"));
    const [ category, setCategory ] = useState<string>("all");
    // TODO: refactor "all" into const
    const [ media, setMedia ] = useState<string[]>([ "all" ]);

    const [ allCategories, setAllCategories ] = useState<string[]>([]);
    
    const context = { 
        data, 
        setData, 
        date, 
        setDate, 
        category, 
        setCategory, 
        media, 
        setMedia,
        allCategories,
        setAllCategories,
    };

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
