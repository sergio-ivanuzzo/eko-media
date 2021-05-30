import React, { useMemo } from "react";

import useData from "~/hooks/useData";

import useDrawStackedBar, { BAR_HEIGHT } from "~/hooks/useChart/draw/useDrawStackedBar";

import { StyledChart } from "./styles";
import { CATEGORIES_MAP, CATEGORY_KEYS, TYPES } from "~/common/constants";

import theme from "~/common/theme";

const TYPE = TYPES.CATEGORY;

const { orange, gray, cyan, green } = theme.palette;

const baseColors = [ orange.carrot, gray.silver, green.jade, green.salad, cyan.azure ];

const StackedBar = (): JSX.Element => {
    const { getDataset, selectedCategory, topCategories } = useData();

    const dataset: ICategorizedItem[] = getDataset(TYPE, "all") as Array<ICategorizedItem>;

    const categories: string[] = useMemo(
        () => dataset.length ? dataset.map((item: ICategorizedItem) => item.category) : [],
        [ dataset ]
    );

    // data for y axis
    const media = useMemo(
        () => categories.length
            // remove "category" field, keep only media fields
            ? Object.keys(dataset[0]).filter((key: string) => !CATEGORY_KEYS.includes(key))
            : [],
        [ categories ]
    );

    const height = useMemo(
        () => media.length
            ? BAR_HEIGHT * media.length
            : 0,
        [ media ]
    );

    const data = useMemo(() => {
        return media.map((media: string) => {
            return {
                key: media,
                ...categories.reduce((result: { [key: string]: number }, category, index) => {
                    result[category] = Number(dataset[index][media])
                    return result;
                }, {}),
                total: categories.reduce((sum, category, index) => sum + Number(dataset[index][media]), 0),
                values: categories.map((category, index) => Number(dataset[index][media])),
            }
        });
    }, [ dataset ]);

    const { draw } = useDrawStackedBar({ data, xData: categories, yData: media });

    const colors = selectedCategory === "all"
        ? baseColors
        // detect color attached to selected category
        : [ baseColors[topCategories.findIndex((category) => category === CATEGORIES_MAP[selectedCategory])] ];

    return (
        <StyledChart
            draw={draw}
            height={height}
            colors={colors}
        />
    );
};

export default StackedBar;
