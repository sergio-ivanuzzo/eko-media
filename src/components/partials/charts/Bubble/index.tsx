import React, { useMemo } from "react";

import Chart from "~/components/core/Chart";
import useData from "~/hooks/useData";
import useDrawBubble, { MAX_BUBBLE_RADIUS } from "~/hooks/useChart/draw/useDrawBubble";

import { IBubbleDataItem } from "~/hooks/useChart/draw/useDrawBubble/types";
import { IBubbleDatasetItem } from "~/components/partials/charts/Bubble/types";
import { TYPES } from "~/common/constants";

const TYPE = TYPES.WORD_CLOUD;

const MAX_PERCENTAGE = 100;

const Bubble = (): JSX.Element => {
    const { getDataset, filteredCategories } = useData();

    const dataset = getDataset(TYPE) as Array<IBubbleDatasetItem>;

    // the top value will be related to MAX_BUBBLE_RADIUS
    const maxWordCount = Math.max(...dataset.map((item: IBubbleDatasetItem) => parseInt(item.word_count)));

    const calculateRadius = (wordCount: number) => {
        const percentage = MAX_PERCENTAGE * wordCount / maxWordCount;
        return MAX_BUBBLE_RADIUS * percentage / MAX_PERCENTAGE;
    };

    const data = useMemo(() => {
        return dataset.map((item: IBubbleDatasetItem) => {
            const wordCount = parseInt(item.word_count);
            const { category, word } = item;
            return {
                category,
                word,
                wordCount,
                radius: calculateRadius(wordCount)
            } as IBubbleDataItem
        });
    }, [ dataset ]);

    const { draw } = useDrawBubble({ data, filteredCategories });

    return <Chart draw={draw} />
};

export default Bubble;
