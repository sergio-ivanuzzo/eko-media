import React, { createContext, useEffect, useState } from "react";

import { SHOULD_LOAD_ONLY_ONCE } from "~/common/constants";

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
    isDataLoaded: false,
    setDataLoaded: () => undefined,
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
    const [ isDataLoaded, setDataLoaded ] = useState(true);

    useEffect(() => {
        const flag = !!Object.keys(data).filter((key) => !SHOULD_LOAD_ONLY_ONCE.includes(key)).length;
        if (flag !== isDataLoaded) {
            setDataLoaded(flag);
        }
    }, [ data ]);

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
        isDataLoaded,
        setDataLoaded,
    };

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
