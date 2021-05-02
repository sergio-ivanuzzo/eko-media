import { CATEGORIES, TYPES } from "~/common/constants";

import { IData, IItem } from "~/providers/DataProvider/types";

export interface IUseDataResponse {
    data: IData;
    loadAll: () => Promise<void>;
    getDataset: (type: TYPES, category?: string | CATEGORIES) => IItem[];
}
