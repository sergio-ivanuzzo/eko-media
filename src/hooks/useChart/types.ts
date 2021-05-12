import { RefObject } from "react";

import { IChartProps } from "~/components/core/Chart/types";

export interface IChartDrawProps {
    chartRef: RefObject<SVGSVGElement>;
    width: number;
    height: number;
}

export type IUseChartProps = IChartProps;

export interface IUseChartResponse {
    chartRef: RefObject<SVGSVGElement>;
    containerRef: RefObject<HTMLDivElement>;
    width: number;
    height: number;
}
