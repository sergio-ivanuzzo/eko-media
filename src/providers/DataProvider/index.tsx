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
    lastUpdated: new Date(),
    setLastUpdated: () => undefined,
    isDataLoading: false,
    setDataLoading: () => undefined,
});

const DataProvider = ({ children }: IDataProviderProps): JSX.Element => {
    const [ data, setData ] = useState<IData<IItem>>({});
    const [ date, setDate ] = useState<Date>(new Date());
    const [ category, setCategory ] = useState<string>("all");
    const [ media, setMedia ] = useState<string[]>([]);

    const [ topCategories, setTopCategories ] = useState<string[]>([]);
    const [ allMedia, setAllMedia ] = useState<string[]>([]);

    const [ lastUpdated, setLastUpdated ] = useState();
    const [ isDataLoading, setDataLoading ] = useState(true);

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
        lastUpdated,
        setLastUpdated,
        isDataLoading,
        setDataLoading,
    };

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
