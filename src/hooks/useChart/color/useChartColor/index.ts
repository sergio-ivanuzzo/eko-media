import { rgb } from "d3";

import randomize from "~/helpers/randomize";

import { IGetColorProps, IUseChartColorResponse } from "~/hooks/useChart/color/useChartColor/types";

import theme from "~/common/theme";

const { orange, gray, cyan, green } = theme.palette;

const defaultProps: IGetColorProps = {
    randomShade: false,
    randomOpacity: false
}

const useChartColor = (): IUseChartColorResponse => {

    const colors = [ orange.carrot, gray.silver, green.jade, green.salad, cyan.azure ];

    const getColor = (index: number, params = defaultProps): string => {
        const { randomShade, randomOpacity } = params;

        let categoryColor = colors[index];

        if (randomShade) {
            const color = rgb(categoryColor);
            const darker = (value: number) => color.darker(value);
            const brighter = (value: number) => color.brighter(value);
            const allFunctions = [ darker, brighter ];
            const randomFunc = allFunctions[Math.random() * allFunctions.length | 0];

            categoryColor = randomFunc(randomize(0.2, 0.7)).toString();
        }

        if (randomOpacity) {
            const { r, g, b } = rgb(categoryColor);
            categoryColor = rgb(r, g, b, randomize(0.4, 1.1)).toString();
        }

        return categoryColor;
    };

    return {
        getColor
    }
}

export default useChartColor;
