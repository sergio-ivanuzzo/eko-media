enum CASES {
    FIRST = 0,
    SECOND = 1,
    THIRD = 2,
}

const getCase = (relatedNumber: string): CASES => {
    const lastOne = Number(relatedNumber.slice(-1));
    const lastTwo = Number(relatedNumber.slice(-2));

    if ([ 1, 21, 31, 41, 51, 61, 71, 81, 9 ].includes(lastTwo)) { // 1, 21, 31... 101
        return CASES.FIRST;
    } else if ([ 2, 3, 4 ].includes(lastOne)) { // 2, 3, 4, 22, 33
        return CASES.SECOND;
    }

    return CASES.THIRD;
}

const maybePluralize = (relatedNumber: string | number, cases: [string, string, string]): string => {
    const selectedCase = getCase(relatedNumber.toString());
    return cases[selectedCase as number];
};

export default maybePluralize;
