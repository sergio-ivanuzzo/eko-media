import React from "react";

import formatString from "~/helpers/formatString";

import { Heading } from "./styles";
import { HeadingLevel } from "~/components/core/FormattedTitle/constants";

const FormattedTitle = ({ params = [], level = HeadingLevel.H3, ...props }: IFormattedTitleProps): JSX.Element => {
    const { placeholder, inline } = props;

    const htmlString = formatString({
        initial: placeholder,
        replacer: (param) => `<span>${param}</span>`,
        params
    });

    return (
        <Heading
            inline={inline}
            dangerouslySetInnerHTML={{ __html: htmlString }}
            as={`h${level}` as any} />
    );
};

export default FormattedTitle;
