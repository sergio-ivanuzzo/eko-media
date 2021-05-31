import React, { useMemo } from "react";

import useData from "~/hooks/useData";
import useDrawBar from "~/hooks/useChart/draw/useDrawBar";

import { BAR_HEIGHT } from "~/hooks/useChart/draw/useDrawStackedBar";
import { NON_MEDIA_KEYS, TYPES } from "~/common/constants";

import { StyledChart } from "./styles";
import theme from "~/common/theme";

const TYPE = TYPES.TOPIC;

const { orange, gray } = theme.palette;

const TopicMediaBar = ({ selectedTopic = "" }: ITopicMediaBarProps): JSX.Element => {
    const { selectedCategory, getDataset, allMedia } = useData();
    const dataset = getDataset(TYPE, selectedCategory) || [];

    // data for y axis
    const media = useMemo(
        () => dataset.length
            // remove "category" field, keep only media fields
            ? Object.keys(dataset[0])
                .filter((key: string) => !NON_MEDIA_KEYS.includes(key))
                // need to be sure media key is correct
                .filter((key) => allMedia.includes(key))
            : [],
        [ dataset ]
    );

    const height = useMemo(
        () => media.length
            ? BAR_HEIGHT * media.length
            : 0,
        [ media ]
    );

    const filteredDataset = dataset.filter(({ topic }) => topic === selectedTopic)[0] || {};

    const data = useMemo(() => {
        return Object.keys(filteredDataset)
            .filter((key) => !NON_MEDIA_KEYS.includes(key) && media.includes(key)).map((mediaName) => {
                const value = Number(filteredDataset[mediaName]);
                return {
                    key: mediaName,
                    title: `${mediaName}: ${value}%`,
                    value: value || 0.1 // I added this line to show lines with zero
                }
            })
            // not allow empty values
            .filter((item) => item.value)
    }, [ dataset ]);

    const { draw } = useDrawBar({ data, yData: media });

    return <StyledChart draw={draw} height={height} colors={[ gray.silver, orange.carrot ]} />;
};

export default TopicMediaBar;
