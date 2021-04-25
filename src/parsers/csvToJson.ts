interface IItem {
    [key: string]: string;
}

const csvToJson = (rawData: string, separator: string = ','): Array<IItem> => {
    const [headerRow, ...valueRows] = rawData.split(separator);
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
