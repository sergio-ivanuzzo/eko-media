import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IItem {
    [key: string]:
        string
        | number
        | { [key: string]: number | string }
        | Array<{ [key: string]: number | string }>
        | string[];
}

export interface IData<T extends IItem> {
    [key: string]: T[];
}

export interface IDataProviderProps {
    children: ReactNode;
}

export interface IDataProviderContext<T extends IItem> {
    data: IData<T>;
    setData: Dispatch<IData<T>>;
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    media: string[];
    setMedia: Dispatch<SetStateAction<string[]>>;
    allCategories: string[];
    setAllCategories: Dispatch<SetStateAction<string[]>>;
}
