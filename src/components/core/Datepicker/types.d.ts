declare interface IDatePickerProps extends ISelectableComponent, IStylableComponent {
    onDateChange: () => void;
    renderTrigger?: (props: IDatePickerTriggerProps) => JSX.Element;
    renderItem?: (props: IDatePickerItemProps) => JSX.Element;
    disabled?: boolean;
}

declare interface IDatePickerTriggerProps extends IDropdownTriggerProps {
    selectedDate: Date;
    lastUpdated?: Date;
}

declare interface IDatePickerItemProps extends IActivableComponent {
    onClick: () => void;
    value: string;
}

declare interface IDatePickerHandleChangeProps {
    month?: number;
    year?: number;
}
