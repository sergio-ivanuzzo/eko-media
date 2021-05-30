import React, { useState } from "react";

import PaginatedList from "~/components/core/PaginatedList";
import PoliticianCard from "~/components/partials/Content/PoliticianBar/PoliticianCard";
import useData from "~/hooks/useData";

import { Mention, NON_MEDIA_KEYS, POLITICIANS_PHOTOS_DIR, TYPES } from "~/common/constants";

const TYPE = TYPES.POLITICIAN;

const PoliticianBar = ({ limit, selectable = true, onSelect = () => null }: IPoliticianBarProps): JSX.Element => {
    const { getDataset, selectedCategory, allMedia } = useData();
    const dataset = getDataset(TYPE, selectedCategory) || [];

    const validMediaKeys = Object.keys(dataset[0] || {})
        .filter((key) => {
            return !NON_MEDIA_KEYS.includes(key) && allMedia.some(
                (mediaName) => key.includes(mediaName)
            )
        });

    let data: IPoliticianBarItem[] = dataset.map(({ name, image_name, ...rest }) => {
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
    }).sort((current, next) => next.mentions[Mention.ALL] - current.mentions[Mention.ALL]);

    if (limit) {
        data = data.slice(0, limit);
    }

    const [ selected, setSelected ] = useState<string>(data[0].name);
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
                selected={selected !== name}
                selectable={selectable}
            />
        );
    });

    return (
        <PaginatedList>
            {children}
        </PaginatedList>
    );
};

export default PoliticianBar;
