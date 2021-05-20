export interface IGetColorProps {
    randomShade?: boolean;
    randomOpacity?: boolean;
}

export interface IUseChartColorResponse {
    getColor: (index: number, params?: IGetColorProps) => string;
    getColorIndexByCategory: (category: string) => number;
}
