declare interface IOnBarClickProps {
    key: string;
    value: number;
}

declare interface IDrawBarProps {
    data: Array<{ [key: string]: string | number }>;
    yData: string[];
    onClick?: (props: IOnBarClickProps) => void;
}
