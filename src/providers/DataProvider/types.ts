import React, { Dispatch, SetStateAction } from "react";

import { CATEGORIES } from "~/common/constants";

export interface IItem {
    [key: string]: string | number;
}

export interface ICategorizedItem extends IItem {
    category: string;
}

export interface IData<T extends IItem> {
    [key: string]: T[];
}

export interface IDataProviderProps {
    children: React.ReactNode;
}

export interface IDataProviderContext<T extends IItem> {
    data: IData<T>;
    setData: Dispatch<SetStateAction<IData<T>>>;
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
    category: CATEGORIES;
    setCategory: Dispatch<SetStateAction<CATEGORIES>>;
    media: string[];
    setMedia: Dispatch<SetStateAction<string[]>>;
}
