import { FormattedMessage, useIntl } from "react-intl";
import React, { useCallback, useEffect, useState } from "react";

import Dropdown from "~/components/core/Dropdown";
import {
    IDefaultSelectItemProps,
    IHandleSelectAllProps,
    IHandleSelectProps,
    ISelectChildrenProps,
    ISelectItemProps,
    ISelectOption,
    ISelectProps,
    ISelectTriggerProps
} from "~/components/core/Select/types";
import { IDropdownTriggerProps, IRenderDropdownChildrenProps } from "~/components/core/Dropdown/types";

import { MenuItem, Trigger, TriggerItem } from "./styles";

const DefaultItem = ({ option, handleSelect, close }: ISelectItemProps): JSX.Element => {
    return <MenuItem onClick={() => handleSelect({ option, close })}>{option.value}</MenuItem>;
};

const DefaultTrigger = ({ selected, toggle, ...props }: ISelectTriggerProps): JSX.Element => {
    return (
        <Trigger {...props} onClick={() => toggle()}>
            {selected.map((item: string, index: number) => (
                <TriggerItem key={index}>{`${item}`}</TriggerItem>
            ))}
        </Trigger>);
};

const DefaultSelectAll = ({ handleSelectAll, close }: IDefaultSelectItemProps): JSX.Element => {
    return (
        <MenuItem onClick={() => handleSelectAll({ close })}>
            <FormattedMessage id="select.default_select_all" />
        </MenuItem>
    );
};

const SelectChildren = ({ renderSelectAll = DefaultSelectAll, ...props }: ISelectChildrenProps): JSX.Element => {
    const { handleSelect, close, allowSelectAll, options, renderItem, handleSelectAll } = props;

    let children = options.map(
        (option: ISelectOption) => renderItem({
            option,
            handleSelect,
            close,
            handleSelectAll
        })
    );
    if (allowSelectAll) {
        children = [ renderSelectAll({ handleSelectAll, close }) ].concat(children);
    }

    return (
        <>{children}</>
    );
};

const Select = ({ renderItem = DefaultItem, renderTrigger = DefaultTrigger, ...props }: ISelectProps): JSX.Element => {
    const {
        value = [],
        onSelect,
        options,
        multiple = false,
        allowSelectAll = false,
        renderSelectAll = DefaultSelectAll
    } = props;

    const { formatMessage } = useIntl();
    const itemAll = formatMessage({ id: "select.default_select_all" });

    const [ selected, setSelected ] = useState<string[]>(
        value.length ? value
            : allowSelectAll
                ? [ itemAll ]
                : []
    );

    const handleSelect = useCallback(({ option, close }: IHandleSelectProps): void => {
        if (!multiple) {
            close();
            setSelected([ option.key ]);
        } else {
            if (!selected.includes(option.key)) {
                setSelected([ ...selected, option.key ]);
            }
        }
    }, [ selected ]);

    const handleSelectAll = useCallback(({ close }: IHandleSelectAllProps): void => {
        close();
        if (multiple) {
            setSelected(options.map((item: ISelectOption) => item.key));
        } else {
            setSelected([ "all" ])
        }
    }, [ options ]);

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
                        allowSelectAll={allowSelectAll}
                        handleSelectAll={handleSelectAll}
                        renderSelectAll={renderSelectAll}
                        { ...props} />
                );
            }}
        </Dropdown>
    );
};

export default Select;
