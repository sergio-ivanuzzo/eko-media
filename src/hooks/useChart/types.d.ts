declare interface IChartDrawProps {
    chartRef: RefObject<SVGSVGElement>;
    width: number;
    height: number;
    colors: string[];
}

declare type TUseChartProps = IChartProps;

declare interface IUseChartResponse {
    chartRef: RefObject<SVGSVGElement>;
    containerRef: RefObject<HTMLDivElement>;
    width: number;
    height: number;
}
