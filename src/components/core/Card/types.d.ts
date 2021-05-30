declare interface ICardProps extends IStylableComponent {
    avatarUrl?: string;
    text: string;
    name: string;
    renderText?: (props: ICardTextProps) => JSX.Element;
    append?: () => JSX.Element;
    onClick?: () => void;
}

declare interface ICardTextProps {
    text: string;
}
