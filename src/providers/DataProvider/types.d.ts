declare interface IItem {
    [key: string]:
        string
        | number
        | Array<IItem>;
}

declare interface IData<T extends IItem> {
    [key: string]: T[];
}

declare interface IDataProviderProps {
    children: ReactNode;
}

declare interface IDataProviderContext<T extends IItem> {
    data: IData<T>;
    setData: Dispatch<IData<T>>;
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    media: string[];
    setMedia: Dispatch<SetStateAction<string[]>>;
    topCategories: string[];
    setTopCategories: Dispatch<SetStateAction<string[]>>;
    allMedia: string[];
    setAllMedia: Dispatch<SetStateAction<string[]>>;
    // used with last_updated.txt
    lastUpdated?: Date;
    setLastUpdated: Dispatch<SetStateAction<Date>>;
    isDataLoading?: boolean;
    setDataLoading: Dispatch<SetStateAction<boolean>>;
    isDataLoaded: boolean;
    setDataLoaded: Dispatch<SetStateAction<boolean>>;
}
