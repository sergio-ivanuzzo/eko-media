import { IItem } from "~/providers/DataProvider/types";

const csvToJson = (rawData: string, separator = ","): Array<IItem> => {
    const [ headerRow, ...valueRows ] = rawData.split("\n");
    const itemKeys = headerRow.split(separator);

    return valueRows.map((row: string) => {
        const values: string[] = row.split(separator);
        return itemKeys.reduce((item: IItem, key: string, index: number) => {
            item[key] = values[index];
            return item;
        }, {});
    });
};

export default csvToJson;
