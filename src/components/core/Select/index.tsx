import { FormattedMessage, useIntl } from "react-intl";
import React, { useCallback, useEffect, useState } from "react";

import Close from "~/components/icons/Close";
import ConditionalRender from "~/components/core/ConditionalRender";
import Dropdown from "~/components/core/Dropdown";
import Placeholder from "~/components/core/Placeholder";

import { PlaceholderTextAlign } from "~/components/core/Placeholder/constants";
import { CloseButton, MenuItem, TriggerContainer, TriggerItem } from "./styles";

const DefaultItem = ({ option, isActive = false, ...props }: ISelectItemProps): JSX.Element => {
    const {
        handleUnselect,
        close,
        handleSelect
    } = props;

    return (
        <MenuItem key={option?.key}
                  onClick={() => !isActive ? handleSelect({ option, close }) : handleUnselect({ option })}
                  isActive={isActive}
        >
            {option.value}
        </MenuItem>
    );
};

const DefaultTrigger = ({ selected, ...props }: ISelectTriggerProps): JSX.Element => {
    const { toggle, multiple, handleUnselect } = props;

    return (
        <TriggerContainer {...props} onClick={() => toggle()}>
            <ConditionalRender condition={!!selected.length}>
                <>
                    {selected.map((item: ISelectOption) => (
                        <TriggerItem key={item.key} multiple={multiple}>
                            {`${item.value}`}
                            { multiple && (
                                <CloseButton onClick={
                                    (e) => {
                                        e.stopPropagation();
                                        handleUnselect({ option: item });
                                    }}
                                >
                                    <Close />
                                </CloseButton>
                              )
                            }
                        </TriggerItem>
                    ))}
                </>
                <Placeholder align={PlaceholderTextAlign.LEFT}>
                    <FormattedMessage id="placeholder.empty_select" />
                </Placeholder>
            </ConditionalRender>
        </TriggerContainer>);
};

const DefaultSelectAll = ({ handleSelectAll, close }: IDefaultSelectItemProps): JSX.Element => {
    return (
        <MenuItem onClick={() => handleSelectAll({ close })}>
            <FormattedMessage id="select.default_select_all" />
        </MenuItem>
    );
};

const SelectChildren = ({ renderSelectAll = DefaultSelectAll, ...props }: ISelectChildrenProps): JSX.Element => {
    const {
        handleSelect,
        close = () => null,
        allowSelectAll,
        options,
        renderItem,
        handleSelectAll,
        handleUnselect,
        selected
    } = props;

    let children = options.map(
        (option: ISelectOption) => renderItem({
            option,
            handleSelect,
            close,
            handleSelectAll,
            handleUnselect,
            isActive: selected.map((item) => item.key).includes(option.key)
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
            if (!selected.map((item) => item.key).includes(option.key)) {
                setSelected((prevSelected) => [ ...prevSelected, option ]);
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

    const handleUnselect = ({ option }: IHandleUnselectProps): void => {
        const index = selected.findIndex((item) => item.key === option.key);
        if (index >= 0) {
            setSelected([ ...selected.slice(0, index), ...selected.slice(index + 1) ]);
        }
    };

    // fixing race condition, bc most actual "selected" will be available on next render
    useEffect(() => {
        onSelect(selected);
    }, [ selected ]);
    
    return (
        <Dropdown
            className={className}
            tabIndex={tabIndex}
            renderTrigger={
                (props: IDropdownTriggerProps) => renderTrigger({
                    selected,
                    multiple,
                    handleUnselect,
                    ...props
                })
            }
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
                        handleUnselect={handleUnselect}
                        selected={selected}
                        { ...props} />
                );
            }}
        </Dropdown>
    );
};

export default Select;