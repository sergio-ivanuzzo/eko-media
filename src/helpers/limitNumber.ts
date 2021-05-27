const limitNumber = (value: number, minLimit: number, maxLimit: number): number => {
    if (value < minLimit) {
        return minLimit;
    } else if (value > maxLimit) {
        return maxLimit;
    }

    return value;
};

export default limitNumber;
