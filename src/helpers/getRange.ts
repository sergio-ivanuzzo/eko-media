const getRange = (min: number, max: number): number[] => {
    return Array.from({ length: max - min }).map(() => min++);
}

export default getRange;
