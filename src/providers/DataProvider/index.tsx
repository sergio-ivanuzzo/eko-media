import React, { createContext, useState } from "react";

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
    topCategories: [],
    setTopCategories: () => undefined,
    allMedia: [],
    setAllMedia: () => undefined,
});

const DataProvider = ({ children }: IDataProviderProps): JSX.Element => {
    const [ data, setData ] = useState<IData<IItem>>({});
    // TODO: remove old_2021-03 const, this one for test only (since we have data for old_2021-03)
    const [ date, setDate ] = useState<Date>(new Date());
    const [ category, setCategory ] = useState<string>("all");
    // TODO: refactor "all" into const
    const [ media, setMedia ] = useState<string[]>([]);

    const [ topCategories, setTopCategories ] = useState<string[]>([]);
    const [ allMedia, setAllMedia ] = useState<string[]>([]);

    const context = { 
        data, 
        setData, 
        date, 
        setDate, 
        category, 
        setCategory, 
        media, 
        setMedia,
        topCategories,
        setTopCategories,
        allMedia,
        setAllMedia,
    };

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
