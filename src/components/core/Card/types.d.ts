declare interface ICardProps extends IStylableComponent {
    avatarUrl?: string;
    text: string;
    name: string;
    renderText?: (props: ICardTextProps) => JSX.Element;
    append?: () => JSX.Element;
    onClick?: () => void;
    width?: number;
}

declare interface ICardTextProps {
    text: string;
}

declare interface ICardContainerProps {
    width?: number;
}
