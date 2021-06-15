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

const DEFAULT_TARGET_SORTED_ASC = true;
const DEFAULT_COUNT_SORTED_ASC = true;

const ReferenceItem = ({ from, to, direction, referenceCount, ...props }: IReferenceItemProps): JSX.Element => {

    const { setSelectedNodeName } = props;

    return (
        <ReferenceItemContainer>
            <MediaName title={from} onClick={() => setSelectedNodeName(from)}>{from}</MediaName>
            <ArrowContainer>
                <ConditionalRender condition={direction === ReferenceDirection.FORWARD}>
                    <StyledArrowRight />
                    <StyledArrowLeft />
                </ConditionalRender>
            </ArrowContainer>
            <MediaName title={to} onClick={() => setSelectedNodeName(to)}>{to}</MediaName>
            <ReferenceCount>{referenceCount}</ReferenceCount>
        </ReferenceItemContainer>
    );
};

const ReferenceBar = ({ items: originItems, setSelectedNodeName }: IReferenceBarProps): JSX.Element => {

    const [ items, setItems ] = useState(originItems);
    const [ targetSortedASC, setTargetSortedASC ] = useState(DEFAULT_TARGET_SORTED_ASC);
    const [ countSortedASC, setCountSortedASC ] = useState(DEFAULT_COUNT_SORTED_ASC);

    const isSorted = useMemo(
        () => !isEqual(items, originItems),
        [ items, targetSortedASC, countSortedASC ]
    );

    const resetSort = () => {
        setItems([ ...originItems ]);
        // return another sort controls into default state
        setTargetSortedASC(DEFAULT_TARGET_SORTED_ASC);
        setCountSortedASC(DEFAULT_COUNT_SORTED_ASC);
    };
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
                    <SortButton onClick={resetSort} disabled={!isSorted}>
                        <Undo />
                    </SortButton>
                </MediaName>
                <ArrowContainer />
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
                <ReferenceItem key={index} {...item} setSelectedNodeName={setSelectedNodeName} />
            ))}
        </ReferenceList>
    );
};

export default ReferenceBar;
