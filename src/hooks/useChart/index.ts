import { Selection, select } from "d3";
import { useEffect, useRef } from "react";

import useData from "~/hooks/useData";
import useElementSize from "~/hooks/useElementSize";


const useChart = (props: TUseChartProps): IUseChartResponse => {
    const { draw, width: staticWidth = 0, height: staticHeight = 0, colors = [] } = props;

    const { selectedCategory } = useData();
    // draw tooltips
    const tooltipSelector = "#root > .chart-tooltip";
    const tooltip:  Selection<HTMLDivElement, unknown, HTMLElement, any> = select(tooltipSelector).node()
        ? select(tooltipSelector)
        : select("#root").append("div").attr("class", "chart-tooltip");

    useEffect(() => {
        tooltip.html("").style("display", "none");

        // clean up
        return () => {
            tooltip.html("").style("display", "none");
        };
    }, [ selectedCategory ]);

    // to remove tooltip on scroll page
    useEffect(() => {
        if (tooltip) {
            const handler = () => tooltip.style("display", "none").style("left", "-9999px");
            document.addEventListener("scroll", handler);
            return () => document.removeEventListener("scroll", handler);
        }
    }, [ tooltip ]);

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
            draw({ chartRef, width, height, colors, tooltip });
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
