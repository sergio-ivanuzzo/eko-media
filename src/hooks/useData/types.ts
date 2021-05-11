import { TYPES } from "~/common/constants";

import { IData, IItem } from "~/providers/DataProvider/types";

export interface IUseDataResponse {
    data: IData<IItem>;
    loadAll: () => Promise<void>;
    getDataset: (type: TYPES, category?: string) => IItem[];
    topCategories: string[];
}
