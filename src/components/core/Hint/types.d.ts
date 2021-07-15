declare interface IHintProps extends ISelectableComponent, IStylableComponent, IHintItemProps {
    renderTrigger?: (props: IDropdownTriggerProps) => JSX.Element;
    renderItem?: (props: IHintItemProps) => JSX.Element;
    toRight?: boolean;
}

declare interface IHintItemProps {
    text: string;
    extraText?: string;
    linkUrl?: string;
    linkText?: string;
    background?: string;
    color?: string;
}
