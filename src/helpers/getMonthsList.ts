const MONTHS_COUNT = 12;

const getMonthsList = (locale: string): string[] => {
    // 1970 1st January
    const date = new Date(0);

    return Array.from(Array(MONTHS_COUNT)).map((_, index) => {
        date.setMonth(index);
        return date.toLocaleString(locale, { month: "long" })
    })
};

export default getMonthsList;
