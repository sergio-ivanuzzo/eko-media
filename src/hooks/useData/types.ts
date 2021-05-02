import { TYPES } from "~/common/constants";

import { IData } from "~/providers/DataProvider/types";

export interface IUseDataResponse {
    data: IData;
    loadAll: (selectedDate: Date) => Promise<void>;
    filter: (type: TYPES) => IData;
}
