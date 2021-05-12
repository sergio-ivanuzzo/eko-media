import { useEffect, useRef } from "react";

import useElementSize from "~/hooks/useElementSize";

import { IUseChartProps, IUseChartResponse } from "~/hooks/useChart/types";

const useChart = ({ draw, width: staticWidth = 0, height: staticHeight = 0 }: IUseChartProps): IUseChartResponse => {
    const chartRef = useRef<SVGSVGElement>(null);
    const [ containerRef, dynamicWidth, dynamicHeight ] = useElementSize<HTMLDivElement>();

    const width = staticWidth || dynamicWidth;
    const height = staticHeight || dynamicHeight;

    useEffect(() => {
        // not draw if width or height eq to zero
        if (width && height) {
            draw({ chartRef, width, height });
        }
    }, [ draw, width, height ]);

    return {
        chartRef,
        containerRef,
        width,
        height
    }
};

export default useChart;
