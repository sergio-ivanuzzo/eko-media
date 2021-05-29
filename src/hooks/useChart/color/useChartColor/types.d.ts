interface IGetColorParams {
    randomShade?: boolean;
    randomOpacity?: boolean;
}

declare interface IGetColorProps {
    index: number;
    params?: IGetColorParams;
    colors: string[];
}

declare interface IUseChartColorResponse {
    getColor: (props: IGetColorProps) => string;
}
