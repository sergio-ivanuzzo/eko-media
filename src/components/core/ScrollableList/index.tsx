import React from "react";

import { ScrollableListContainer } from "./styles";

const ScrollableList = ({ children, limit }: IScrollableListProps): JSX.Element => {
    return (
        <ScrollableListContainer limit={limit}>
            {limit ? children.slice(0, limit) : children}
        </ScrollableListContainer>
    );
};

export default ScrollableList;
