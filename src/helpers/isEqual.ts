const isEqual = (a: any, b: any): boolean => {
    if (typeof a === "object" && typeof b === "object") {
        if (Array.isArray(a) && Array.isArray(b)) {
            return a.every((item, index) => isEqual(item, b[index]));
        }
        return Object.entries(a).toString() === Object.entries(b).toString();
    }

    return a === b;
};

export default isEqual;
