import React from "react";

import { PlaceholderContainer } from "~/components/core/Placeholder/styles";

const Placeholder = ({ children, ...props }: IPlaceholderProps): JSX.Element => {
    return (
        <PlaceholderContainer {...props}>
            <div>{children}</div>
        </PlaceholderContainer>
    );
};

export default Placeholder;
