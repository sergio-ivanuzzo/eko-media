import React, { useMemo } from "react";

import useData from "~/hooks/useData";

import { CATEGORY_KEYS, TYPES } from "~/common/constants";

import useDrawStackedBar, { BAR_HEIGHT } from "~/hooks/useChart/draw/useDrawStackedBar";

import { StyledChart } from "./styles";

const TYPE = TYPES.CATEGORY;

const StackedBar = (): JSX.Element => {
    const { getDataset } = useData();

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
                }, {})
            }
        });
    }, [ dataset ]);

    const { draw } = useDrawStackedBar({ data, xData: categories, yData: media });

    return <StyledChart draw={draw} height={height} />
};

export default StackedBar;
