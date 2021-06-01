declare interface IDatePickerProps extends ISelectableComponent, IStylableComponent {
    onDateChange: () => void;
    renderTrigger?: (props: IDatePickerTriggerProps) => JSX.Element;
    renderItem?: (props: IDatePickerItemProps) => JSX.Element;
}

declare interface IDatePickerTriggerProps extends IDropdownTriggerProps {
    selectedDate: Date;
}

declare interface IDatePickerItemProps extends IActivableComponent {
    onClick: () => void;
    value: string;
}

declare interface IDatePickerHandleChangeProps {
    month?: number;
    year?: number;
}
