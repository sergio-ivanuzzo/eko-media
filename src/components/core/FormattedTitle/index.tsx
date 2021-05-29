import React from "react";

import formatString from "~/helpers/formatString";

import { Heading } from "./styles";
import { HeadingLevel } from "~/components/core/FormattedTitle/constants";

const FormattedTitle = ({ placeholder, params = [], level = HeadingLevel.H3 }: IFormattedTitleProps): JSX.Element => {
    const htmlString = formatString({
        initial: placeholder,
        replacer: (param) => `<span>${param}</span>`,
        params
    });

    return (
        <Heading
            dangerouslySetInnerHTML={{ __html: htmlString }}
            as={`h${level}` as any} />
    );
};

export default FormattedTitle;
