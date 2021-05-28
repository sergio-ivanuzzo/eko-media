interface IFormatStringProps {
    initial: string;
    replacer?: (param: string) => string;
    params: string[];
}

const formatString = ({ initial, replacer = (param: string) => param, params }: IFormatStringProps): string => {
    return params.reduce(
        (result, param: string, index: number) => result.replace(`{${index}}`, replacer(param)),
        initial
    );
};

export default formatString;
