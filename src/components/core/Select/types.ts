import { IDropdownTriggerProps, IRenderDropdownChildrenProps } from "~/components/core/Dropdown/types";

export type TSelectOption = string | number;

export interface IHandleSelectProps {
    option: TSelectOption;
    close: () => void;
}

export interface ISelectItemProps extends IHandleSelectProps {
    handleSelect: (props: IHandleSelectProps) => void;
}

export interface ISelectTriggerProps extends IDropdownTriggerProps {
    selected: TSelectOption[];
}

export interface ISelectChildrenProps extends IRenderDropdownChildrenProps {
    options: TSelectOption[];
    handleSelect: (props: IHandleSelectProps) => void;
    renderItem: (props: ISelectItemProps) => JSX.Element;
}

export interface ISelectProps {
    value?: TSelectOption[];
    onSelect: (selected: TSelectOption[]) => void;
    multiple?: boolean;
    renderItem?: (props: ISelectItemProps) => JSX.Element;
    renderTrigger?: (props: ISelectTriggerProps) => JSX.Element;
    options: TSelectOption[];
}

export interface ITriggerItemProps {
    multiple?: boolean;
}
