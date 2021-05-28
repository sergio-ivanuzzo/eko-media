import { useIntl } from "react-intl";
import React, { useMemo } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import FormattedTitle from "~/components/core/FormattedTitle";
import useData from "~/hooks/useData";

import useDrawStackedBar, { BAR_HEIGHT } from "~/hooks/useChart/draw/useDrawStackedBar";

import { CATEGORIES_MAP, CATEGORY_KEYS, TYPES } from "~/common/constants";
import { StackedBarContainer, StyledChart } from "./styles";

const TYPE = TYPES.CATEGORY;

const StackedBar = (): JSX.Element => {
    const { getDataset, selectedCategory } = useData();
    const { formatMessage } = useIntl();

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

    return (
        <StackedBarContainer>
            <ConditionalRender condition={selectedCategory === "all"}>
                <FormattedTitle
                    placeholder={formatMessage({ id: "stacked_bar.title.all" })}
                    params={[ formatMessage({ id: "top5" }) ]} />
                <FormattedTitle
                    placeholder={formatMessage({ id: "stacked_bar.title.category" })}
                    params={[ CATEGORIES_MAP[selectedCategory] ]} />
            </ConditionalRender>
            <StyledChart draw={draw} height={height} />
        </StackedBarContainer>
    );
};

export default StackedBar;
