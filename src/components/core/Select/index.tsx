import React, { useCallback, useEffect, useState } from "react";

import Dropdown from "~/components/core/Dropdown";
import { IDropdownTriggerProps, IRenderDropdownChildrenProps } from "~/components/core/Dropdown/types";
import {
    IHandleSelectProps,
    ISelectChildrenProps,
    ISelectItemProps,
    ISelectProps,
    ISelectTriggerProps,
    TSelectOption
} from "~/components/core/Select/types";

import { MenuItem, Trigger } from "./styles";

const DefaultItem = ({ option, handleSelect, close }: ISelectItemProps): JSX.Element => {
    return <MenuItem onClick={() => handleSelect({ option, close })}>{option}</MenuItem>;
};

const DefaultTrigger = ({ selected, toggle, ...props }: ISelectTriggerProps): JSX.Element => {
    return (
        <Trigger {...props} onClick={() => toggle()}>
            {selected.map((item: string | number) => (
                <div>{`${item}`}</div>
            ))}
        </Trigger>);
};

const SelectChildren = ({ options, renderItem, handleSelect, close }: ISelectChildrenProps): JSX.Element => {
    return (
        <>{options.map((option: string | number) => renderItem({ option, handleSelect, close }))}</>
    );
};

const Select = ({ renderItem = DefaultItem, renderTrigger = DefaultTrigger, ...props }: ISelectProps): JSX.Element => {
    const { value = [], onSelect, options, multiple = false } = props;
    const [ selected, setSelected ] = useState<TSelectOption[]>(value);

    const handleSelect = useCallback(({ option, close }: IHandleSelectProps): void => {
        if (!multiple) {
            close();
            setSelected([ option ]);
        } else {
            if (!selected.includes(option)) {
                setSelected([ ...selected, option ]);
            }
        }
    }, [ selected ]);

    // fixing race condition, bc most actual "selected" will be available on next render
    useEffect(() => {
        onSelect(selected);
    }, [ selected ]);
    
    return (
        <Dropdown renderTrigger={(props: IDropdownTriggerProps) => renderTrigger({ selected, ...props })}>
            {(props: IRenderDropdownChildrenProps) => {
                return (
                    <SelectChildren
                        options={options}
                        renderItem={renderItem}
                        handleSelect={handleSelect}
                        { ...props} />
                );
            }}
        </Dropdown>
    );
};

export default Select;
