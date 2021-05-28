import React from "react";

import ConditionalRender from "~/components/core/ConditionalRender";

import { ReferenceDirection } from "~/components/charts/Network/constants";
import {
    ArrowContainer,
    MediaName,
    ReferenceCount,
    ReferenceItemContainer,
    ReferenceList,
    StyledArrowLeft,
    StyledArrowRight,
} from "./styles";

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
