import { CATEGORIES, TYPES } from "~/common/constants";

import { IData, IItem } from "~/providers/DataProvider/types";

export interface IUseDataResponse<T extends IItem> {
    data: IData<T>;
    loadAll: () => Promise<void>;
    getDataset: (type: TYPES, category?: string | CATEGORIES) => T[];
}
