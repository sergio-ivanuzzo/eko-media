import { rgb } from "d3";

import randomize from "~/helpers/randomize";

import { AppError } from "~/hooks/useNotifyError";

const defaultParams: IGetColorParams = {
    randomShade: false,
    randomOpacity: false
}

const useChartColor = (): IUseChartColorResponse => {

    const getColor = ({ index, colors, params = defaultParams }: IGetColorProps): string => {
        const { randomShade, randomOpacity } = params;

        let selectedColor = colors[index];
        if (!selectedColor) {
            throw new AppError({
                message: "error.chart_color.unknown_index",
                // because of numeration from zero add +1 to index for output
                // actually error means that index cannot be greater then color.length - 1
                params: [ `${index + 1}`, `${colors.length}` ]
            })
        }

        if (randomShade) {
            const color = rgb(selectedColor);
            const darker = (value: number) => color.darker(value);
            const brighter = (value: number) => color.brighter(value);
            const allFunctions = [ darker, brighter ];
            const randomFunc = allFunctions[Math.random() * allFunctions.length | 0];

            selectedColor = randomFunc(randomize(0.2, 0.7)).toString();
        }

        if (randomOpacity) {
            const { r, g, b } = rgb(selectedColor);
            selectedColor = rgb(r, g, b, randomize(0.4, 1.1)).toString();
        }

        return selectedColor;
    };

    return {
        getColor
    }
}

export default useChartColor;
