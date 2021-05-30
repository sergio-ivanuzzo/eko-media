import React, { useMemo } from "react";

import useData from "~/hooks/useData";
import useDrawStackedBar, { BAR_HEIGHT } from "~/hooks/useChart/draw/useDrawStackedBar";

import { StyledChart } from "./styles";
import { Mention, NON_MEDIA_KEYS, TYPES } from "~/common/constants";

import theme from "~/common/theme";

const TYPE = TYPES.POLITICIAN;

const { orange, gray, green } = theme.palette;

const MentionChart = ({ politicianName = "" }: IMentionChartProps): JSX.Element => {

    const { getDataset, selectedCategory, allMedia } = useData();
    const dataset = getDataset(TYPE, selectedCategory);

    const validMediaKeys = Object.keys(dataset[0] || {})
        .filter((key) => {
            return !NON_MEDIA_KEYS.includes(key) && allMedia.some(
                (mediaName) => key.includes(mediaName)
            )
        });

    const media = allMedia.filter((mediaName) => validMediaKeys.some((key) => key.includes(mediaName)));

    const height = useMemo(
        () => media.length
            ? BAR_HEIGHT * media.length
            : 0,
        [ media ]
    );

    const categories = [ Mention.POSITIVE, Mention.NEUTRAL, Mention.NEGATIVE ];

    const data = useMemo(() => {
        return media.map((media: string) => {
            const filteredDataset = dataset.filter(({ name }) => !politicianName || name === politicianName);
            return {
                key: media,
                ...categories.reduce((result: { [key: string]: number }, mention) => {
                    result[mention] = filteredDataset.reduce((sum, item) => {
                        const key = Object.keys(item).find((key) => key.includes(mention) && key.includes(media));
                        return key ? sum + Number(item[key]) : sum;
                    }, 0);
                    return result;
                }, {}),
                total: categories.reduce(
                    (sum, mention) => sum + filteredDataset.reduce((sum, item) => {
                        const key = Object.keys(item).find((key) => key.includes(mention) && key.includes(media));
                        return key ? sum + Number(item[key]) : sum;
                    }, 0),
                    0
                ),
                values: categories.map((mention) => {
                    return filteredDataset.reduce((sum, item) => {
                        const key = Object.keys(item).find((key) => key.includes(mention) && key.includes(media));
                        return key ? sum + Number(item[key]) : sum;
                    }, 0);
                }),
            }
        });
    }, [ dataset ]);

    console.log(data);

    const { draw } = useDrawStackedBar({ data, xData: categories, yData: media });

    return <StyledChart draw={draw} height={height} colors={[ green.salad, gray.silver, orange.carrot ]} />;
};

export default MentionChart;
