import React, { useMemo } from "react";

import Chart from "~/components/core/Chart";
import useData from "~/hooks/useData";

import { FILTER_BY_CATEGORY_INDEXES, TYPES } from "~/common/constants";

import useDrawStackedBar from "~/hooks/useChart/draw/useDrawStackedBar";

const BAR_HEIGHT = 32;
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
            ? Object.keys(dataset[0]).filter((key: string) => !FILTER_BY_CATEGORY_INDEXES.includes(key))
            : [],
        [ categories ]
    );

    console.log(dataset);

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

    return <Chart draw={draw} height={height} />
};

export default StackedBar;
