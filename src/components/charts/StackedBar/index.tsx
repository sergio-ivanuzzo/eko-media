import { FormattedMessage } from "react-intl";
import React, { useMemo } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import useData from "~/hooks/useData";

import useDrawStackedBar, { BAR_HEIGHT, MARGIN_LEFT } from "~/hooks/useChart/draw/useDrawStackedBar";

import { StyledChart } from "./styles";
import { CATEGORIES_MAP, CATEGORY_KEYS, TYPES } from "~/common/constants";

import { LegendsContainer } from "~/components/core/Chart/styles";
import { StyledPlaceholder } from "./styles";
import theme from "~/common/theme";

const TYPE = TYPES.CATEGORY;

const { orange, gray, cyan, green } = theme.palette;

const baseColors = [ orange.carrot, gray.silver, green.jade, green.salad, cyan.azure ];

const StackedBar = (): JSX.Element => {
    const { getDataset, selectedCategory, topCategories, isDataLoaded, isDataLoading } = useData();

    const dataset: ICategorizedItem[] = getDataset(TYPE, "all") as Array<ICategorizedItem>;
    // this dataset used for evaluate percentages
    const datasetAll: ICategorizedItem[] = getDataset(TYPE, "all", true, false) as Array<ICategorizedItem>;

    const categories: string[] = useMemo(
        () => dataset.length ? dataset.map((item: ICategorizedItem) => item.category) : [],
        [ dataset ]
    );

    // data for y axis
    const media = useMemo(
        () => categories.length
            // media names from category_all file used here
            // so we should use such media names everywhere in app (and files)
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
                total: topCategories.reduce((sum, category, index) => sum + Number(datasetAll[index][media]), 0),
                values: categories.map((category, index) => Number(dataset[index][media])),
            }
        });
    }, [ dataset ]);

    const { draw } = useDrawStackedBar({ data, xData: categories, yData: media });

    const colors = selectedCategory === "all"
        ? baseColors
        // detect color attached to selected category
        : [ baseColors[topCategories.findIndex((category) => category === CATEGORIES_MAP[selectedCategory])] ];

    const flag = useMemo(() => !!media.length && isDataLoaded, [ media, isDataLoaded ]);

    return (
        <ConditionalRender condition={flag}>
            <>
                <LegendsContainer className="legends" offset={MARGIN_LEFT} />
                <StyledChart
                    draw={draw}
                    height={height}
                    colors={colors}
                />
            </>
            <StyledPlaceholder>
                <FormattedMessage id="placeholder.category_media.empty_data" />
            </StyledPlaceholder>
        </ConditionalRender>
    );
};

export default StackedBar;
