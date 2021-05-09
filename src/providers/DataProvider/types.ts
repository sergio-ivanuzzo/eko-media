import React, { Dispatch, SetStateAction } from "react";

import { CATEGORIES } from "~/common/constants";

export interface IItem {
    [key: string]:
        string
        | number
        | { [key: string]: number | string }
        | Array<{ [key: string]: number | string }>;
}

export interface IData<T extends IItem> {
    [key: string]: T[];
}

export interface IDataProviderProps {
    children: React.ReactNode;
}

export interface IDataProviderContext<T extends IItem> {
    data: IData<T>;
    setData: Dispatch<IData<T>>;
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    category: CATEGORIES;
    setCategory: Dispatch<SetStateAction<CATEGORIES>>;
    media: string[];
    setMedia: Dispatch<SetStateAction<string[]>>;
}
