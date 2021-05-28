import React from "react";

import { PlaceholderContainer } from "~/components/core/Placeholder/styles";

const Placeholder = ({ children, align, className = "" }: IPlaceholderProps): JSX.Element => {
    return (
        <PlaceholderContainer align={align} className={className}>
            <div>{children}</div>
        </PlaceholderContainer>
    );
};

export default Placeholder;
