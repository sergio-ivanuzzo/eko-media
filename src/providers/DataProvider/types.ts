import React, { Dispatch, SetStateAction } from "react";

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
}
