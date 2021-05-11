import React, { useCallback, useState } from "react";

import Dropdown from "~/components/core/Dropdown";
import { IDropdownTriggerProps } from "~/components/core/Dropdown/types";
import { ISelectProps, ISelectTriggerProps, TSelectValue } from "~/components/core/Select/types";

import { MenuItem, Trigger } from "./styles";

const DefaultItem = (
    option: TSelectValue,
    handleSelect: (selectedValue: TSelectValue | TSelectValue[]) => void
): JSX.Element => {
    return <MenuItem onClick={() => handleSelect(option)}>{option}</MenuItem>;
};

const DefaultTrigger = ({ selected, ...props }: ISelectTriggerProps): JSX.Element => {
    return <Trigger {...props}>{selected}</Trigger>
};

const Select = ({ renderItem = DefaultItem, renderTrigger = DefaultTrigger, ...props }: ISelectProps): JSX.Element => {
    const { value, onSelect, options } = props;
    const [ selected, setSelected ] = useState<TSelectValue | TSelectValue[]>(value);

    const handleSelect = useCallback((selectedValue: TSelectValue | TSelectValue[]): void => {
        setSelected(selectedValue);
        onSelect(selectedValue);
    }, [ selected ]);
    
    return (
        <Dropdown renderTrigger={(props: IDropdownTriggerProps) => renderTrigger({ selected, ...props })}>
            {options.map((option: TSelectValue) => renderItem(option, handleSelect))}
        </Dropdown>
    );
};

export default Select;
