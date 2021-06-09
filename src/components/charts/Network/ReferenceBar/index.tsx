import React, { useEffect, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";

import { ReferenceDirection } from "~/components/charts/Network/constants";
import {
    ArrowContainer,
    MediaName,
    ReferenceCount,
    ReferenceHeader,
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

const ReferenceBar = ({ items: originItems }: IReferenceBarProps): JSX.Element => {

    const [ items, setItems ] = useState(originItems);
    const [ targetSortedASC, setTargetSortedASC ] = useState(true);
    const [ countSortedASC, setCountSortedASC ] = useState(true);

    const resetSort = () => setItems([ ...originItems ]);
    const sortByTarget = () => {
        setTargetSortedASC(!targetSortedASC);
        setItems([ ...items ].sort((a, b) => {
            if (targetSortedASC) {
                return a.to < b.to ? -1 : 1;
            } else {
                return a.to > b.to ? -1 : 1;
            }
        }));
    };
    const sortByCount = () => {
        setCountSortedASC(!countSortedASC);
        setItems([ ...items ].sort((a, b) => {
            if (countSortedASC) {
                return b.referenceCount - a.referenceCount;
            } else {
                return a.referenceCount - b.referenceCount;
            }
        }));
    };

    useEffect(() => {
        setItems([ ...originItems ]);
    }, [ originItems ]);

    return (
        <ReferenceList>
            <ReferenceHeader>
                <MediaName><button onClick={resetSort}>By Current</button></MediaName>
                <ArrowContainer></ArrowContainer>
                <MediaName><button onClick={sortByTarget}>By Target</button></MediaName>
                <ReferenceCount><button onClick={sortByCount}>By Count</button></ReferenceCount>
            </ReferenceHeader>
            {items.map((item: IReferenceItem, index: number) => (
                <ReferenceItem key={index} {...item} />
            ))}
        </ReferenceList>
    );
};

export default ReferenceBar;
