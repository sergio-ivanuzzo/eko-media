interface IFormatStringProps {
    initial: string;
    replacer?: (param: string) => string;
    params?: string[];
}

const replaceAll = (input: string, from: string, to: string) => {
    if (input.replaceAll) {
        return input.replaceAll(from, to);
    } else {
        while (input.includes(from)) {
            input = input.replace(from, to);
        }
        return input;
    }
};

const formatString = ({ initial, replacer = (param: string) => param, params = [] }: IFormatStringProps): string => {
    return params?.length ? params.reduce(
        (result, param: string, index: number) => replaceAll(
            result,
            `{${index}}`,
            replacer(param)),
        initial
    ) : initial;
};

// const formatString = ({ initial, replacer = (param: string) => param, params = [] }: IFormatStringProps): string => {
//     return params?.length ? params.reduce(
//         (result, param: string, index: number) => result.replaceAll(`{${index}}`, replacer(param)),
//         initial
//     ) : initial;
// };

export default formatString;
