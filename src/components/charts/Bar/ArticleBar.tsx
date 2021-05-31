import React, { useMemo } from "react";

import useData from "~/hooks/useData";

import useDrawBar from "~/hooks/useChart/draw/useDrawBar";

import { StyledChart } from "./styles";
import { TYPES } from "~/common/constants";

import theme from "~/common/theme";

const TYPE = TYPES.TOPIC;

const { orange, gray } = theme.palette;

const ARTICLE_BAR_HEIGHT = 50;

const ArticleBar = ({ onClick }: IArticleBarProps): JSX.Element => {
    const { selectedCategory, getDataset } = useData();
    const dataset = getDataset(TYPE, selectedCategory) || [];

    const topics: string[] = useMemo(
        () => dataset.length ? dataset.map((item) => item.topic as string) : [],
        [ dataset ]
    );

    const height = useMemo(
        () => topics.length
            ? ARTICLE_BAR_HEIGHT * topics.length
            : 0,
        [ topics ]
    );

    const data = useMemo(() => {
        return dataset.map(({ topic, ...rest }) => {
            return {
                key: topic as string,
                value: Object.keys(rest).reduce((sum, key) => sum + Number(rest[key]), 0)
            };
        })
    }, [ dataset ]);

    const { draw } = useDrawBar({ data, yData: topics, onClick });

    return <StyledChart draw={draw} height={height} colors={[ gray.silver, orange.carrot ]} />;
};

export default ArticleBar;
