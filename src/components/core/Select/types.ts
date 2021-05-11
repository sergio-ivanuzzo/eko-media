import { IDropdownTriggerProps } from "~/components/core/Dropdown/types";

export type TSelectValue = string | number;

export interface ISelectTriggerProps extends IDropdownTriggerProps {
    selected: TSelectValue | TSelectValue[];
}

export interface ISelectProps {
    value: TSelectValue;
    onSelect: (selected: TSelectValue | TSelectValue[]) => void;
    multiple: boolean;
    renderItem: (
        option: TSelectValue,
        handleSelect: (selectedValue: TSelectValue | TSelectValue[]) => void
    ) => JSX.Element;
    renderTrigger: (props: ISelectTriggerProps) => JSX.Element;
    options: TSelectValue[];
}
