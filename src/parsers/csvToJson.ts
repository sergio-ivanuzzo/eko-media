import { IItem } from "~/providers/DataProvider/types";

const csvToJson = (rawData: string, separator = ","): Array<IItem> => {
    const [ headerRow, ...valueRows ] = rawData.split("\n");
    const itemKeys = headerRow.split(separator);

    return valueRows.map((row: string) => {
        const values: string[] = row.split(separator);
        return itemKeys.reduce((item: IItem, key: string, index: number) => {
            // last csv item will contain \n, so we need trim to remove it
            item[key.trim()] = values[index];
            return item;
        }, {});
    });
};

export default csvToJson;
