import { IItem } from "~/providers/DataProvider/types";

export interface ICategorizedItem extends IItem {
    category: string;
}
