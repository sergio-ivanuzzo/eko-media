import { IDropdownTriggerProps, IRenderDropdownChildrenProps } from "~/components/core/Dropdown/types";

export interface ISelectProps {
    value?: string[];
    onSelect: (selected: string[]) => void;
    multiple?: boolean;
    renderItem?: (props: ISelectItemProps) => JSX.Element;
    renderTrigger?: (props: ISelectTriggerProps) => JSX.Element;
    options: ISelectOption[];
    allowSelectAll?: boolean;
    renderSelectAll?: (props: Partial<ISelectItemProps>) => JSX.Element;
}

export interface IDefaultSelectItemProps {
    handleSelectAll: (props: IHandleSelectAllProps) => void;
    close: () => void;
}

export interface ISelectItemProps extends IDefaultSelectItemProps {
    handleSelect: (props: IHandleSelectProps) => void;
    option: ISelectOption;
}

export interface ISelectOption {
    key: string;
    value: string;
}


export interface ISelectTriggerProps extends IDropdownTriggerProps {
    selected: string[];
}

export interface ISelectChildrenProps extends IRenderDropdownChildrenProps, ISelectAllProps {
    options: ISelectOption[];
    handleSelect: (props: IHandleSelectProps) => void;
    renderItem: (props: ISelectItemProps) => JSX.Element;
    renderSelectAll: (props: IDefaultSelectItemProps) => JSX.Element;
    allowSelectAll?: boolean;
}

export interface ISelectAllProps extends IHandleSelectAllProps {
    handleSelectAll: (props: IHandleSelectAllProps) => void;
}

export interface IHandleSelectProps {
    option: ISelectOption;
    close: () => void;
}

export interface IHandleSelectAllProps {
    close: () => void;
}
