declare interface ISelectProps extends ISelectableComponent, IStylableComponent {
    value?: ISelectOption[];
    onSelect: (selected: ISelectOption[]) => void;
    multiple?: boolean;
    renderItem?: (props: ISelectItemProps) => JSX.Element;
    renderTrigger?: (props: ISelectTriggerProps) => JSX.Element;
    options: ISelectOption[];
    allowSelectAll?: boolean;
    renderSelectAll?: (props: Partial<ISelectItemProps>) => JSX.Element;
    allowUnselect?: boolean;
}

declare interface IDefaultSelectItemProps {
    handleSelectAll: (props: IHandleSelectAllProps) => void;
    close: () => void;
    isActive?: boolean;
}

declare interface ISelectItemProps extends IDefaultSelectItemProps {
    handleSelect: (props: IHandleSelectProps) => void;
    handleUnselect: (props: IHandleUnselectProps) => void;
    option: ISelectOption;
    isActive?: boolean;
}

declare interface ISelectOption {
    key: string;
    value: string;
}


declare interface ISelectTriggerProps extends IDropdownTriggerProps {
    selected: ISelectOption[];
    multiple?: boolean;
    handleUnselect: (props: IHandleUnselectProps) => void;
    allSelected?: boolean;
}

declare interface ISelectChildrenProps extends IRenderDropdownChildrenProps, ISelectAllProps {
    options: ISelectOption[];
    handleSelect: (props: IHandleSelectProps) => void;
    renderItem: (props: ISelectItemProps) => JSX.Element;
    renderSelectAll: (props: IDefaultSelectItemProps) => JSX.Element;
    selected: ISelectOption[];
    allowSelectAll?: boolean;
    handleUnselect: (props: IHandleUnselectProps) => void;
}

declare interface ISelectAllProps extends IHandleSelectAllProps {
    handleSelectAll: (props: IHandleSelectAllProps) => void;
}

declare interface IHandleSelectProps {
    option: ISelectOption;
    close?: () => void;
}

declare interface IHandleSelectAllProps {
    close?: () => void;
}

declare interface IHandleUnselectProps {
    option: ISelectOption;
}

declare interface ITriggerItemProps {
    multiple?: boolean;
}
