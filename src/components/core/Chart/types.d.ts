declare interface IChartContainerProps {
    width?: number;
    height?: number;
}

declare interface IChartProps extends IChartContainerProps, IStylableComponent {
    draw: (props: IChartDrawProps) => void;
    colors?: string[];
}

declare interface ILegendsContainerProps {
    offset?: number;
}
