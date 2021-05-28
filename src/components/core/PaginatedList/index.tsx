import React, { useMemo, useState } from "react";

import CircleDown from "~/components/icons/CircleDown";
import CircleUp from "~/components/icons/CircleUp";
import ConditionalRender from "~/components/core/ConditionalRender";

import { NavigationButton, PaginatedListContainer } from "./styles";

const DEFAULT_LIMIT = 5;

const PaginatedList = ({ children, limit = DEFAULT_LIMIT }: IPaginatedListProps): JSX.Element => {
    const maxPage = useMemo(() => Math.ceil(children.length / limit), [ children, limit ]);

    const [ page, setPage ] = useState(0);

    const prevPage = () => setPage(page - 1);
    const nextPage = () => setPage(page + 1);

    return (
        <PaginatedListContainer>
            <ConditionalRender condition={page > 0}>
                <NavigationButton onClick={prevPage}>
                    <CircleUp />
                </NavigationButton>
            </ConditionalRender>
            {children.slice(page * limit, (page + 1) * limit)}
            <ConditionalRender condition={page < maxPage - 1}>
                <NavigationButton onClick={nextPage}>
                    <CircleDown />
                </NavigationButton>
            </ConditionalRender>
        </PaginatedListContainer>
    );
};

export default PaginatedList;
