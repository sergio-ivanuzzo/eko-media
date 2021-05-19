import React from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import {
    ArrowContainer,
    MediaName,
    ReferenceCount,
    ReferenceItemContainer,
    ReferenceList,
    StyledArrowLeft,
    StyledArrowRight,
} from "~/components/partials/charts/Network/ReferenceBar/styles";
import {
    IReferenceBarProps,
    IReferenceItem,
    IReferenceItemProps, ReferenceDirection
} from "~/components/partials/charts/Network/ReferenceBar/types";

const ReferenceItem = ({ from, to, direction, referenceCount }: IReferenceItemProps): JSX.Element => {

    return (
        <ReferenceItemContainer>
            <MediaName title={from}>{from}</MediaName>
            <ArrowContainer>
                <ConditionalRender condition={direction === ReferenceDirection.FORWARD}>
                    <StyledArrowRight />
                    <StyledArrowLeft />
                </ConditionalRender>
            </ArrowContainer>
            <MediaName title={to}>{to}</MediaName>
            <ReferenceCount>{referenceCount}</ReferenceCount>
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
