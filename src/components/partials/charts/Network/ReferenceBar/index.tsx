import React from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import {
    IReferenceBarProps,
    IReferenceItem,
    IReferenceItemProps, ReferenceDirection
} from "~/components/partials/charts/Network/ReferenceBar/types";
import {
    ReferenceItemContainer,
    ReferenceList,
    StyledArrowLeft,
    StyledArrowRight,
} from "~/components/partials/charts/Network/ReferenceBar/styles";

const ReferenceItem = ({ from, to, direction, referenceCount }: IReferenceItemProps): JSX.Element => {

    return (
        <ReferenceItemContainer>
            <div>{from}</div>
            <div>
                <ConditionalRender condition={direction === ReferenceDirection.FORWARD}>
                    <StyledArrowRight />
                    <StyledArrowLeft />
                </ConditionalRender>
            </div>
            <div>{to}</div>
            <div>{referenceCount}</div>
        </ReferenceItemContainer>
    );
};

const ReferenceBar = ({ items }: IReferenceBarProps): JSX.Element => {
    return (
        <ReferenceList>
            {items.map((item: IReferenceItem, index: number) => (
                <ReferenceItem key={index} {...item} />
            ))}
        </ReferenceList>
    );
};

export default ReferenceBar;
