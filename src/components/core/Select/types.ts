import { IDropdownTriggerProps, IRenderDropdownChildrenProps } from "~/components/core/Dropdown/types";

export interface ISelectOption {
    key: string;
    value: string;
}

export interface IHandleSelectProps {
    option: ISelectOption;
    close: () => void;
}

export interface ISelectItemProps extends IHandleSelectProps {
    handleSelect: (props: IHandleSelectProps) => void;
}

export interface ISelectAllItemProps {
    handleSelectAll: () => void;
}

export interface ISelectTriggerProps extends IDropdownTriggerProps {
    selected: string[];
}

export interface ISelectChildrenProps extends IRenderDropdownChildrenProps, ISelectAllProps {
    options: ISelectOption[];
    handleSelect: (props: IHandleSelectProps) => void;
    renderItem: (props: ISelectItemProps) => JSX.Element;
    renderSelectAll: (props: ISelectAllItemProps) => JSX.Element;
    allowSelectAll?: boolean;
}

export interface ISelectProps {
    value?: string[];
    onSelect: (selected: string[]) => void;
    multiple?: boolean;
    renderItem?: (props: ISelectItemProps) => JSX.Element;
    renderTrigger?: (props: ISelectTriggerProps) => JSX.Element;
    options: ISelectOption[];
    allowSelectAll?: boolean;
    renderSelectAll?: (props: ISelectAllItemProps) => JSX.Element;
}

export interface ITriggerItemProps {
    multiple?: boolean;
}

export interface ISelectAllProps {
    handleSelectAll: () => void;
}
