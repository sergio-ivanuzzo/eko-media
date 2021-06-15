declare interface IHintProps extends ISelectableComponent, IStylableComponent, IHintItemProps {
    renderTrigger?: (props: IDropdownTriggerProps) => JSX.Element;
    renderItem?: (props: IHintItemProps) => JSX.Element;
}

declare interface IHintItemProps {
    text: string;
    linkUrl?: string;
    linkText?: string;
}
