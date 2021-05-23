import React from "react";

import { PlaceholderContainer } from "~/components/core/Placeholder/styles";

const Placeholder = ({ children, align }: IPlaceholderProps): JSX.Element => {
    return (
        <PlaceholderContainer align={align}>
            <div>{children}</div>
        </PlaceholderContainer>
    );
};

export default Placeholder;
