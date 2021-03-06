import { TYPES } from "~/common/constants";

declare interface IUseDataResponse {
    data: IData<IItem>;
    loadAll: () => Promise<void>;
    getDataset: (type: TYPES, category?: string, withDate?: boolean, allowFilterByCategory?: boolean) => IItem[];
    topCategories: string[];
    selectedCategories: string[];
    selectedCategory: string;
    setCategory: Dispatch<SetStateAction<string>>;
    selectedMedia: string[];
    setMedia: Dispatch<SetStateAction<string[]>>;
    allMedia: string[];
    getMonthAndYear: () => { month: string, year: string };
    lastUpdated?: Date;
    selectedDate: Date;
    isDataLoading?: boolean;
    isDataEmpty: boolean;
}
