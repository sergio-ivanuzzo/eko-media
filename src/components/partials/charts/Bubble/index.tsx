import React, { useMemo } from "react";

import Chart from "~/components/core/Chart";
import useData from "~/hooks/useData";
import useDrawBubble from "~/hooks/useChart/draw/useDrawBubble";

import { IBubbleDataItem } from "~/hooks/useChart/draw/useDrawBubble/types";
import { IBubbleDatasetItem } from "~/components/partials/charts/Bubble/types";
import { TYPES } from "~/common/constants";

const TYPE = TYPES.WORD_CLOUD;

const MAX_BUBBLE_RADIUS = 100;

const MAX_PERCENTAGE = 50;

const Bubble = (): JSX.Element => {
    const { getDataset, topCategories } = useData();

    const dataset = getDataset(TYPE) as Array<IBubbleDatasetItem>;

    // the top value will be related to MAX_BUBBLE_RADIUS
    const maxWordCount = Math.max(...dataset.map((item: IBubbleDatasetItem) => parseInt(item.word_count)));

    const calculateRadius = (wordCount: number) => {
        const percentage = Math.ceil(MAX_PERCENTAGE * wordCount / maxWordCount);
        return MAX_BUBBLE_RADIUS * percentage / 100;
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

    const { draw } = useDrawBubble({ data, topCategories });

    return <Chart draw={draw} />
};

export default Bubble;
