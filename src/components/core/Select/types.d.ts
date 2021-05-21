declare interface ISelectProps {
    value?: ISelectOption[];
    onSelect: (selected: ISelectOption[]) => void;
    multiple?: boolean;
    renderItem?: (props: ISelectItemProps) => JSX.Element;
    renderTrigger?: (props: ISelectTriggerProps) => JSX.Element;
    options: ISelectOption[];
    allowSelectAll?: boolean;
    renderSelectAll?: (props: Partial<ISelectItemProps>) => JSX.Element;
}

declare interface IDefaultSelectItemProps {
    handleSelectAll: (props: IHandleSelectAllProps) => void;
    close: () => void;
}

declare interface ISelectItemProps extends IDefaultSelectItemProps {
    handleSelect: (props: IHandleSelectProps) => void;
    option: ISelectOption;
}

declare interface ISelectOption {
    key: string;
    value: string;
}


declare interface ISelectTriggerProps extends IDropdownTriggerProps {
    selected: ISelectOption[];
}

declare interface ISelectChildrenProps extends IRenderDropdownChildrenProps, ISelectAllProps {
    options: ISelectOption[];
    handleSelect: (props: IHandleSelectProps) => void;
    renderItem: (props: ISelectItemProps) => JSX.Element;
    renderSelectAll: (props: IDefaultSelectItemProps) => JSX.Element;
    allowSelectAll?: boolean;
}

declare interface ISelectAllProps extends IHandleSelectAllProps {
    handleSelectAll: (props: IHandleSelectAllProps) => void;
}

declare interface IHandleSelectProps {
    option: ISelectOption;
    close: () => void;
}

declare interface IHandleSelectAllProps {
    close: () => void;
}
