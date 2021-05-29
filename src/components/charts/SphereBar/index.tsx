import { useIntl } from "react-intl";
import React, { useMemo } from "react";

import FormattedTitle from "~/components/core/FormattedTitle";
import useData from "~/hooks/useData";
import useDrawBar from "~/hooks/useChart/draw/useDrawBar";

import { CATEGORIES_MAP, CATEGORY_KEYS, TYPES } from "~/common/constants";
import { SphereBarContainer, StyledChart } from "./styles";

const TYPE = TYPES.SPHERE;

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

    const data = useMemo(() => {
        return spheres.map((media: string) => {
            const categoriesData = categories.reduce((result: { [key: string]: number }, category, index) => {
                result[category] = Number(dataset[index][media])
                return result;
            }, {});

            categoriesData[CATEGORIES_MAP["all"]] = Object
                .keys(categoriesData)
                .reduce((acc: number, key: string) => acc + (Number(categoriesData[key]) || 0), 0);

            return {
                key: media,
                value: categoriesData[CATEGORIES_MAP[selectedCategory]],
            }
        });
    }, [ dataset ]);

    const { draw } = useDrawBar({ data, xData: [ CATEGORIES_MAP[selectedCategory] ], yData: spheres });

    return (
        <SphereBarContainer>
            <FormattedTitle
                placeholder={formatMessage({ id: "sphere_bar.title" })}
                params={[ CATEGORIES_MAP[selectedCategory] ]} />
            <StyledChart draw={draw} />
        </SphereBarContainer>
    );
};

export default SphereBar;
