import { TYPES } from "~/common/constants";

export interface IFilterParams {
    category: string;
    media: string[];
}

export interface IItem {
    [key: string]: string;
}

export interface IData {
    [key: string]: IItem[];
}

export interface IUseDataResponse {
    data: IData;
    load: (filename: string) => Promise<void>;
    filter: (type: TYPES, params: IFilterParams) => IData;
}
