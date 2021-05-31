import sanitize from "~/helpers/sanitize";

import { AppError } from "~/hooks/useNotifyError";

const csvToJson = (rawData: string, separator = ","): Array<IItem> => {
    const [ headerRow, ...valueRows ] = rawData.split("\n");
    const itemKeys = headerRow.split(separator);

    return valueRows.filter(Boolean).map((row: string, rowIndex: number) => {
        const values: string[] = row.split(separator);
        return itemKeys.reduce((item: IItem, key: string, itemIndex: number) => {
            if (!key) {
                throw new AppError({
                    message: "error.csv.empty_column",
                    params: [ `${rowIndex + 1}`, `${itemIndex + 1}` ]
                });
            }
            item[sanitize(key)] = sanitize(values[itemIndex]);
            return item;
        }, {});
    });
};

export default csvToJson;
