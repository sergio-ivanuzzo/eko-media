declare interface IHintProps extends ISelectableComponent, IStylableComponent {
    renderTrigger?: (props: IDropdownTriggerProps) => JSX.Element;
    renderItem?: () => JSX.Element;
}
