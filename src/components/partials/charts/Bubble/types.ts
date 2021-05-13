import { IItem } from "~/providers/DataProvider/types";

export interface IBubbleDatasetItem extends IItem {
    category: string;
    word: string;
    word_count: string;
}
