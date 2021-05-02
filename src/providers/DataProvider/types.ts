import React, { Dispatch, SetStateAction } from "react";

import { CATEGORIES } from "~/common/constants";

export interface IItem {
    [key: string]: string;
}

export interface IData {
    [key: string]: IItem[];
}

export interface IDataProviderProps {
    children: React.ReactNode;
}

export interface IDataProviderContext {
    data: IData;
    setData: Dispatch<SetStateAction<IData>>;
    category: CATEGORIES;
    setCategory: Dispatch<SetStateAction<CATEGORIES>>;
    media: string[];
    setMedia: Dispatch<SetStateAction<string[]>>;
}
