import { TYPES } from "~/common/constants";

import { IData } from "~/providers/DataProvider/types";

export interface IFilterParams {
    category: string;
    media: string[];
}

export interface IUseDataResponse {
    data: IData;
    loadAll: (selectedDate: Date) => Promise<void>;
    filter: (type: TYPES, params: IFilterParams) => IData;
}
