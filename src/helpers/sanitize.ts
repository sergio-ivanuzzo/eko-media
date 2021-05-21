const sanitize = (value: string): string => {
    return value.trim().replace(/\r?\n|\r/g, "");
};

export default sanitize;
