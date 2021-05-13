import React, { useMemo } from "react";

import Chart from "~/components/core/Chart";
import useBubble from "~/hooks/charts/useBubble";
import useData from "~/hooks/useData";

import { IBubbleDataItem } from "~/hooks/charts/useBubble/types";
import { IBubbleDatasetItem } from "~/components/partials/charts/Bubble/types";
import { TYPES } from "~/common/constants";

const TYPE = TYPES.WORD_CLOUD;

const MAX_BUBBLE_RADIUS = 50;

const MAX_PERCENTAGE = 100;

const Bubble = (): JSX.Element => {
    const { getDataset } = useData();

    const dataset = getDataset(TYPE) as Array<IBubbleDatasetItem>;

    const maxWordCount = Math.max(...dataset.map((item: IBubbleDatasetItem) => parseInt(item.word_count)));

    const calculateRadius = (wordCount: number) => {
        const percentage = MAX_PERCENTAGE * wordCount / maxWordCount;
        return MAX_BUBBLE_RADIUS * percentage / maxWordCount;
    };

    const data = useMemo(() => {
        return dataset.map((item: IBubbleDatasetItem) => {
            const wordCount = parseInt(item.word_count);
            return {
                ...item,
                wordCount,
                radius: calculateRadius(wordCount)
            } as IBubbleDataItem
        });
    }, [ dataset ]);

    // console.log(data);

    const { draw } = useBubble({ data });

    return <Chart draw={draw} />
};

export default Bubble;
