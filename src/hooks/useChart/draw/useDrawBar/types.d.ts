declare interface IOnBarClickProps {
    key: string;
    value: number;
}

declare interface IDrawBarProps {
    data: Array<{ [key: string]: string | number | CallableFunction }>;
    yData: string[];
    onClick?: (props: IOnBarClickProps) => void;
}
