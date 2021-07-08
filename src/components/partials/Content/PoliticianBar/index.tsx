import { FormattedMessage } from "react-intl";
import React, { useEffect, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import PoliticianCard from "~/components/partials/Content/PoliticianBar/PoliticianCard";
import ScrollableList from "~/components/core/ScrollableList";

import useData from "~/hooks/useData";

import { JustifyContent } from "~/components/global.constants";
import { PoliticianBarContainer } from "./styles";
import { StyledPlaceholder } from "~/components/partials/Content/styles";
import { Mention, NON_MEDIA_KEYS, POLITICIANS_PHOTOS_DIR, TYPES } from "~/common/constants";

const TYPE = TYPES.POLITICIAN;

const PoliticianBar = ({ limit, selectable = false, onSelect = () => null }: IPoliticianBarProps): JSX.Element => {
    const { getDataset, selectedCategory, allMedia, isDataLoaded } = useData();
    const dataset = getDataset(TYPE, selectedCategory) || [];

    const validMediaKeys = Object.keys(dataset[0] || {})
        .filter((key) => {
            return !NON_MEDIA_KEYS.includes(key) && allMedia.some(
                (mediaName) => key.includes(mediaName)
            )
        });

    let data: IPoliticianBarItem[] = dataset
        .map(({ name, image_name, ...rest }) => {
                const positiveTotal = validMediaKeys
                    .filter((key) => key.includes(Mention.POSITIVE))
                    .reduce((sum, key) => sum + Number(rest[key]), 0);

                const neutralTotal = validMediaKeys
                    .filter((key) => key.includes(Mention.NEUTRAL))
                    .reduce((sum, key) => sum + Number(rest[key]), 0);

                const negativeTotal = validMediaKeys
                    .filter((key) => key.includes(Mention.NEGATIVE))
                    .reduce((sum, key) => sum + Number(rest[key]), 0);

                return {
                    name: name as string,
                    mentions: {
                        [Mention.POSITIVE]: positiveTotal,
                        [Mention.NEUTRAL]: neutralTotal,
                        [Mention.NEGATIVE]: negativeTotal,
                        [Mention.ALL]: positiveTotal + neutralTotal + negativeTotal
                    },
                    avatarUrl: `${POLITICIANS_PHOTOS_DIR}/${image_name}.png`
                }
            })
        .filter((item) => Object.values(item.mentions).some((mention) => !!mention))
        .sort((current, next) => next.mentions[Mention.ALL] - current.mentions[Mention.ALL]);

    if (limit) {
        data = data.slice(0, limit);
    }

    const [ selected, setSelected ] = useState<string>(data[0]?.name);
    const handleSelect = (politicianName: string) => {
        if (!selectable) {
            return;
        }

        setSelected(politicianName);
        onSelect(politicianName);
    };

    const children = data.map((item: IPoliticianBarItem, index: number) => {
        const { name } = item;
        return (
            <PoliticianCard
                key={index}
                {...item}
                onClick={() => handleSelect(name)}
                selected={selected === name}
                selectable={selectable}
            />
        );
    });

    // set politician name on data loading to show info for parent component
    useEffect(() => {
        onSelect(data[0]?.name);
    }, [ ]);

    return (
        <PoliticianBarContainer>
            <ConditionalRender condition={!!data.length && isDataLoaded}>
                <ScrollableList limit={limit}>
                    {children}
                </ScrollableList>
                <StyledPlaceholder primaryAlign={JustifyContent.CENTER}>
                    <FormattedMessage id="placeholder.category_media.empty_data" />
                </StyledPlaceholder>
            </ConditionalRender>
        </PoliticianBarContainer>
    );
};

export default PoliticianBar;
