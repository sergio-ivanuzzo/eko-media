import React from "react";

import formatString from "~/helpers/formatString";

import { Title } from "./styles";

const FormattedTitle = ({ placeholder, params = [] }: IFormattedTitleProps): JSX.Element => {
    const htmlString = formatString({
        initial: placeholder,
        replacer: (param) => `<span>${param}</span>`,
        params
    });

    return (
        <Title dangerouslySetInnerHTML={{ __html: htmlString }} />
    );
};

export default FormattedTitle;
