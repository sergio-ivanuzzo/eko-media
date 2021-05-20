import { useCallback } from "react";
import * as d3 from "d3";

import { IChartDrawProps } from "~/hooks/useChart/types";

const useDrawBar = (): { draw: (props: IChartDrawProps) => void } => {

    const draw = useCallback(({ chartRef, width, height }: IChartDrawProps): void => {
        const svg = d3.select(chartRef.current).attr("viewBox", `0 0 ${width} ${height}`);
        // clear svg before draw new content
        svg.selectAll("svg > *").remove();
    }, []);

    return {
        draw
    }
};

export default useDrawBar;
