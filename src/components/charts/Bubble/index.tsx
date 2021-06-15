import { FormattedMessage } from "react-intl";
import React, { useMemo } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import useData from "~/hooks/useData";
import useDrawBubble, { MAX_BUBBLE_RADIUS } from "~/hooks/useChart/draw/useDrawBubble";

import { CATEGORIES_MAP, TYPES } from "~/common/constants";

import { MARGIN_LEFT } from "~/hooks/useChart/draw/useDrawStackedBar";
import { StyledChart } from "./styles";
import { ChartHint, LegendsContainer } from "~/components/core/Chart/styles";

import theme from "~/common/theme";

const TYPE = TYPES.WORD_CLOUD;

// by default we want to use 100% in our calculations
const MAX_PERCENTAGE = 100;

const { orange, gray, cyan, green } = theme.palette;

const baseColors = [ orange.carrot, gray.silver, green.jade, green.salad, cyan.azure ];

const Bubble = (): JSX.Element => {
    const { getDataset, selectedCategories, selectedCategory, topCategories } = useData();

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
                radius: calculateRadius(wordCount, category)
            } as IBubbleDataItem
        });
    }, [ dataset ]);

    const colors = selectedCategory === "all"
        ? baseColors
        // detect color attached to selected category
        : [ baseColors[topCategories.findIndex((category) => category === CATEGORIES_MAP[selectedCategory])] ];

    const { draw } = useDrawBubble({ data, selectedCategories: selectedCategories });

    return (
        <>
            <StyledChart draw={draw} colors={colors} />
            <LegendsContainer className="legends" offset={MARGIN_LEFT} />
            <ConditionalRender condition={!!(data?.length && selectedCategories.length)}>
                <>
                    <ChartHint>
                        <FormattedMessage id="zoomable_chart.hint" />
                    </ChartHint>
                    <ChartHint>
                        <FormattedMessage id="draggable_chart.hint" />
                    </ChartHint>
                </>
            </ConditionalRender>
        </>
    );
};

export default Bubble;
