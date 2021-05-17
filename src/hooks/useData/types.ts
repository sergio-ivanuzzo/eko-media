import { Dispatch, SetStateAction } from "react";

import { TYPES } from "~/common/constants";
import { IData, IItem } from "~/providers/DataProvider/types";

export interface IUseDataResponse {
    data: IData<IItem>;
    loadAll: () => Promise<void>;
    getDataset: (type: TYPES, category?: string) => IItem[];
    allCategories: string[];
    filteredCategories: string[];
    setCategory: Dispatch<SetStateAction<string>>;
    filteredMedia: string[];
    setMedia: Dispatch<SetStateAction<string[]>>;
}
