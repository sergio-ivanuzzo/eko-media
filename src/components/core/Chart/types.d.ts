declare interface IChartContainerProps {
    width?: number;
    height?: number;
}

declare interface IChartProps extends IChartContainerProps {
    draw: (props: IChartDrawProps) => void;
}
