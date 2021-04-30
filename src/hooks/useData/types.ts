import { TYPES } from "~/common/constants";

import { IData } from "~/providers/DataProvider/types";

export interface IFilterParams {
    category: string;
    media: string[];
}

export interface IUseDataResponse {
    data: IData;
    load: (filename: string) => Promise<void>;
    filter: (type: TYPES, params: IFilterParams) => IData;
}
