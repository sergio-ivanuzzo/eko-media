import { IChartDrawProps } from "~/hooks/useChart/types";

export interface IChartContainerProps {
    width?: number;
    height?: number;
}

export interface IChartProps extends IChartContainerProps {
    draw: (props: IChartDrawProps) => void;
}

