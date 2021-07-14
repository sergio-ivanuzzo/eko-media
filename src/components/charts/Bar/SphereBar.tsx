import { FormattedMessage, useIntl } from "react-intl";
import React, { useMemo } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import Placeholder from "~/components/core/Placeholder";
import formatString from "~/helpers/formatString";
import useData from "~/hooks/useData";
import useDrawBar from "~/hooks/useChart/draw/useDrawBar";

import { StyledChart } from "./styles";
import theme from "~/common/theme";
import { CATEGORIES_MAP, CATEGORY_KEYS, TYPES } from "~/common/constants";

const TYPE = TYPES.SPHERE;

const { orange, gray } = theme.palette;

const SPHERE_BAR_HEIGHT = 50;

const SphereBar = (): JSX.Element => {
    const { getDataset, selectedCategory } = useData();
    const { formatMessage } = useIntl();

    const dataset = getDataset(TYPE, "all") as Array<ICategorizedItem>;

    const categories: string[] = useMemo(
        () => dataset.length ? dataset.map((item: ICategorizedItem) => item.category) : [],
        [ dataset ]
    );

    // data for y axis
    const spheres = useMemo(
        () => categories.length
            // remove "category" field, keep only media fields
            ? Object.keys(dataset[0]).filter((key: string) => !CATEGORY_KEYS.includes(key))
            : [],
        [ categories ]
    );

    const height = useMemo(
        () => spheres.length
            ? SPHERE_BAR_HEIGHT * spheres.length
            : 0,
        [ spheres ]
    );

    const data = useMemo(() => {
        return spheres.map((media: string) => {
            const categoriesData = categories.reduce((result: { [key: string]: number }, category, index) => {
                result[category] = Number(dataset[index][media])
                return result;
            }, {});

            categoriesData[CATEGORIES_MAP["all"]] = Object
                .keys(categoriesData)
                .reduce((acc: number, key: string) => acc + (Number(categoriesData[key]) || 0), 0);

            const value = categoriesData[CATEGORIES_MAP[selectedCategory]];

            return {
                key: media,
                value,
                tooltipText: formatString({
                    initial: formatMessage({ id: "sphere_bar.tooltip.text" }),
                    params: [ `${value}` ],
                })
            }
        });
    }, [ dataset ]);

    const { draw } = useDrawBar({ data, yData: spheres });

    return (
        <ConditionalRender condition={!!height}>
            <StyledChart draw={draw} height={height} colors={[ gray.silver, orange.carrot ]} />
            <div style={{ marginBottom: "20px" }}>
                <Placeholder>
                    <FormattedMessage id="placeholder.category.empty_data" />
                </Placeholder>
            </div>
        </ConditionalRender>
    );
};

export default SphereBar;
