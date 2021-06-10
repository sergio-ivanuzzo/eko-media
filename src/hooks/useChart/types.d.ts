declare interface IChartDrawProps {
    chartRef: React.RefObject<SVGSVGElement>;
    width: number;
    height: number;
    colors: string[];
    tooltip: import("d3").Selection;
}

declare type TUseChartProps = IChartProps;

declare interface IUseChartResponse {
    chartRef: React.RefObject<SVGSVGElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    width: number;
    height: number;
}
