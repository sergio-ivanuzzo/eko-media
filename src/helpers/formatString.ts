interface IFormatStringProps {
    initial: string;
    replacer?: (param: string) => string;
    params?: string[];
}

const formatString = ({ initial, replacer = (param: string) => param, params = [] }: IFormatStringProps): string => {
    return params?.length ? params.reduce(
        (result, param: string, index: number) => result.replaceAll(`{${index}}`, replacer(param)),
        initial
    ) : initial;
};

export default formatString;
