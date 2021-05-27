import sanitize from "~/helpers/sanitize";

const csvToJson = (rawData: string, separator = ","): Array<IItem> => {
    const [ headerRow, ...valueRows ] = rawData.split("\n");
    const itemKeys = headerRow.split(separator);

    return valueRows.filter(Boolean).map((row: string) => {
        const values: string[] = row.split(separator);
        return itemKeys.reduce((item: IItem, key: string, index: number) => {
            if (!key) {
                throw new Error("Error");
            }
            item[sanitize(key)] = sanitize(values[index]);
            return item;
        }, {});
    });
};

export default csvToJson;
