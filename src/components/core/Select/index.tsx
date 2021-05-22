import { FormattedMessage, useIntl } from "react-intl";
import React, { useCallback, useEffect, useState } from "react";

import Dropdown from "~/components/core/Dropdown";

import { MenuItem, Trigger, TriggerItem } from "./styles";

const DefaultItem = ({ option, handleSelect, close }: ISelectItemProps): JSX.Element => {
    return (
        <MenuItem key={option.key} onClick={() => handleSelect({ option, close })}>
            {option.value}
        </MenuItem>
    );
};

const DefaultTrigger = ({ selected, toggle, ...props }: ISelectTriggerProps): JSX.Element => {
    return (
        <Trigger {...props} onClick={() => toggle()}>
            {selected.map((item: ISelectOption) => (
                <TriggerItem key={item.key}>{`${item.value}`}</TriggerItem>
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
        renderSelectAll = DefaultSelectAll,
        tabIndex,
        className = ""
    } = props;

    const { formatMessage } = useIntl();
    const itemAll: ISelectOption = { key: "all", value: formatMessage({ id: "select.default_select_all" }) };

    const [ selected, setSelected ] = useState<ISelectOption[]>(
        value.length ? value
            : allowSelectAll
                ? [ itemAll ]
                : []
    );

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

    const handleSelectAll = useCallback(({ close }: IHandleSelectAllProps): void => {
        close();
        if (multiple) {
            setSelected(options.map((item: ISelectOption) => item));
        } else {
            setSelected([ itemAll ])
        }
    }, [ options ]);

    // fixing race condition, bc most actual "selected" will be available on next render
    useEffect(() => {
        onSelect(selected);
    }, [ selected ]);
    
    return (
        <Dropdown tabIndex={tabIndex}
                  renderTrigger={(props: IDropdownTriggerProps) => renderTrigger({ selected, ...props })}
                  className={className}
        >
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
