import React, { useMemo } from "react";

import useData from "~/hooks/useData";

import { StyledChart } from "./styles";
import { TYPES } from "~/common/constants";
import useDrawTest from "~/components/partials/charts/Test/useDrawTest";

const TYPE = TYPES.WORD_CLOUD;

const MAX_PERCENTAGE = 100;

export const MAX_BUBBLE_RADIUS_2 = 150;

const Test = (): JSX.Element => {
    const { getDataset, selectedCategories, topCategories } = useData();

    const dataset = getDataset(TYPE) as Array<IBubbleDatasetItem>;

    const maxWordCountMap = topCategories.reduce((result: { [key: string]: number }, category: string) => {
        result[category.toLowerCase()] = Math.max(
            ...dataset.filter((item: IBubbleDatasetItem) => item.category.toLowerCase() === category.toLowerCase())
                .map((item: IBubbleDatasetItem) => parseInt(item.word_count))
        );
        return result;
    }, {});

    const calculateRadius = (wordCount: number, category: string) => {
        const maxWordCount = maxWordCountMap[category.toLowerCase()];
        const percentage = MAX_PERCENTAGE * wordCount / maxWordCount;
        return MAX_BUBBLE_RADIUS_2 * percentage / MAX_PERCENTAGE;
    };

    const data = useMemo(() => {
        return dataset.map((item: IBubbleDatasetItem) => {
            const wordCount = parseInt(item.word_count);
            const { category, word } = item;
            return {
                category,
                word,
                wordCount,
                radius: calculateRadius(wordCount, category)
            } as IBubbleDataItem
        });
    }, [ dataset ]);

    const { draw } = useDrawTest({ data, selectedCategories });

    return <StyledChart draw={draw} />
};

export default Test;
