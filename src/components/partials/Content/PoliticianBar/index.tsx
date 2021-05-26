import React from "react";

import PoliticianCard from "~/components/partials/Content/PoliticianBar/PoliticianCard";
import useData from "~/hooks/useData";

import { PoliticianBarContainer } from "./styles";
import { Mention, NON_MEDIA_KEYS, TYPES } from "~/common/constants";

const TYPE = TYPES.POLITICIAN;

const PoliticianBar = (): JSX.Element => {
    const { getDataset, selectedCategory, allMedia } = useData();
    const dataset = getDataset(TYPE, selectedCategory) || [];

    const validMediaKeys = Object.keys(dataset[0] || {})
        .filter((key) => {
            return !NON_MEDIA_KEYS.includes(key) && allMedia.some(
                (mediaName) => key.includes(mediaName)
            )
        });

    const data: IPoliticianBarItem[] = dataset.map(({ name, ...rest }) => {
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
            }
        }
    })

    return (
        <PoliticianBarContainer>
            {data.map((item: IPoliticianBarItem) => <PoliticianCard {...item} />)}
        </PoliticianBarContainer>
    );
};

export default PoliticianBar;
