declare interface IGetColorProps {
    randomShade?: boolean;
    randomOpacity?: boolean;
}

declare interface IUseChartColorResponse {
    getColor: (index: number, params?: IGetColorProps) => string;
    getColorIndexByCategory: (category: string) => number;
}
