declare interface ICardProps {
    avatarUrl?: string;
    text: string;
    name: string;
    renderText?: (props: ICardTextProps) => JSX.Element;
    append?: () => JSX.Element;
}

declare interface ICardTextProps {
    text: string;
}
