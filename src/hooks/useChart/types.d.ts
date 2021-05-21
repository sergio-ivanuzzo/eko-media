declare interface IChartDrawProps {
    chartRef: RefObject<SVGSVGElement>;
    width: number;
    height: number;
}

declare type IUseChartProps = IChartProps;

declare interface IUseChartResponse {
    chartRef: RefObject<SVGSVGElement>;
    containerRef: RefObject<HTMLDivElement>;
    width: number;
    height: number;
}
