import React, { useEffect, useMemo, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import SortDown from "~/components/icons/SortDown";
import SortUp from "~/components/icons/SortUp";
import Undo from "~/components/icons/Undo";

import isEqual from "~/helpers/isEqual";

import { ReferenceDirection } from "~/components/charts/Network/constants";
import {
    ArrowContainer,
    MediaName,
    ReferenceCount,
    ReferenceHeader,
    ReferenceItemContainer,
    ReferenceList, SortButton,
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

    const isSorted = useMemo(() => {
        // console.log(items, originItems)
        return isEqual(items, originItems);
    }, [ items, targetSortedASC, countSortedASC ]);

    const resetSort = () => setItems([ ...originItems ]);
    const sortByTarget = () => {
        setTargetSortedASC(!targetSortedASC);
        setItems([ ...items ].sort((a, b) => {
            if (targetSortedASC) {
                return a.to > b.to ? -1 : 1;
            } else {
                return a.to < b.to ? -1 : 1;
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
                <MediaName>
                    <SortButton onClick={resetSort} disabled={isSorted}>
                        <Undo />
                    </SortButton>
                </MediaName>
                <ArrowContainer></ArrowContainer>
                <MediaName>
                    <SortButton onClick={sortByTarget}>
                        <ConditionalRender condition={!targetSortedASC}>
                            <SortUp />
                            <SortDown />
                        </ConditionalRender>
                    </SortButton>
                </MediaName>
                <ReferenceCount>
                    <SortButton onClick={sortByCount}>
                        <ConditionalRender condition={!countSortedASC}>
                            <SortUp />
                            <SortDown />
                        </ConditionalRender>
                    </SortButton>
                </ReferenceCount>
            </ReferenceHeader>
            {items.map((item: IReferenceItem, index: number) => (
                <ReferenceItem key={index} {...item} />
            ))}
        </ReferenceList>
    );
};

export default ReferenceBar;
