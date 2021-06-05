import { useEffect, useRef } from "react";

import useElementSize from "~/hooks/useElementSize";

const useChart = (props: TUseChartProps): IUseChartResponse => {
    const { draw, width: staticWidth = 0, height: staticHeight = 0, colors = [] } = props;

    const chartRef = useRef<SVGSVGElement>(null);
    const {
        ref: containerRef,
        width: dynamicWidth,
        height: dynamicHeight
    } = useElementSize<HTMLDivElement>();

    const width = staticWidth || dynamicWidth;
    const height = staticHeight || dynamicHeight;

    useEffect(() => {
        // not draw if width or height eq to zero
        if (width && height) {
            draw({ chartRef, width, height, colors });
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
