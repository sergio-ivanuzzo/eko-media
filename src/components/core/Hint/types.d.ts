declare interface IHintProps extends ISelectableComponent, IStylableComponent {
    renderTrigger?: (props: IDropdownTriggerProps) => JSX.Element;
    renderItem?: (props: IHintItemProps) => JSX.Element;
    text: string;
}

declare interface IHintItemProps {
    text: string;
}
