import { FormattedMessage, useIntl } from "react-intl";
import React, { useCallback, useEffect, useState } from "react";

import Close from "~/components/icons/Close";
import ConditionalRender from "~/components/core/ConditionalRender";
import Placeholder from "~/components/core/Placeholder";

import { MOUSE_BUTTON } from "~/common/constants";
import { PlaceholderTextAlign } from "~/components/core/Placeholder/constants";
import { CloseButton, MenuItem, StyledDropdown, TriggerContainer, TriggerItem } from "./styles";

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

const DefaultTrigger = ({ selected: originSelected, ...props }: ISelectTriggerProps): JSX.Element => {
    const { toggle, multiple = false, handleUnselect, allSelected = false } = props;

    // show only itemAll (in case if all selected) only for multiple mode
    // for single mode always show itemAll and rest of items
    const selected = allSelected && multiple ? originSelected.slice(0, 1) : originSelected;

    return (
        <TriggerContainer {...props} onClick={() => toggle()}>
            <ConditionalRender condition={!!selected.length}>
                <>
                    {selected.map((item: ISelectOption) => (
                        <TriggerItem key={item.key}
                                     multiple={multiple}
                                     onMouseDown={(e: React.MouseEvent) => {
                                         e.preventDefault();
                                         e.stopPropagation();

                                         if (e.button === MOUSE_BUTTON.MIDDLE) {
                                             handleUnselect({ option: item });
                                         }
                                     }}
                        >
                            {`${item.value}`}
                            <ConditionalRender condition={multiple}>
                                <CloseButton tabIndex={-1} onClick={
                                    (e) => {
                                        e.stopPropagation();
                                        handleUnselect({ option: item });
                                    }}
                                >
                                    <Close />
                                </CloseButton>
                            </ConditionalRender>
                        </TriggerItem>
                    ))}
                </>
                <Placeholder align={PlaceholderTextAlign.LEFT}>
                    <FormattedMessage id="placeholder.empty_select" />
                </Placeholder>
            </ConditionalRender>
        </TriggerContainer>);
};

const DefaultSelectAll = ({ handleSelectAll, close, isActive = false }: IDefaultSelectItemProps): JSX.Element => {
    return (
        <MenuItem onClick={() => handleSelectAll({ close })} isActive={isActive}>
            <FormattedMessage id="select.default_select_all" />
        </MenuItem>
    );
};

const Select = ({ renderItem = DefaultItem, renderTrigger = DefaultTrigger, ...props }: ISelectProps): JSX.Element => {
    const { multiple = false } = props;
    const {
        value = [],
        onSelect,
        options: originOptions,
        // by default allow unselect for multiple mode only
        allowUnselect = multiple,
        // will render pseudo- itemAll element in the start of options list
        allowSelectAll = false,
        renderSelectAll = DefaultSelectAll,
        tabIndex,
        className = ""
    } = props;

    const { formatMessage } = useIntl();
    const itemAll: ISelectOption = { key: "all", value: formatMessage({ id: "select.default_select_all" }) };

    let allOptions = originOptions;
    if (allowSelectAll) {
        allOptions = [ itemAll ].concat(originOptions);
    }

    const [ selected, setSelected ] = useState<ISelectOption[]>(
        value.length ? value
            : allowSelectAll
                ? allOptions
                : []
    );

    const isSelected = (option: ISelectOption) => selected.map((item) => item.key).includes(option.key);
    // to check if all items are selected with handleSelectAll
    const allSelected = allowSelectAll && (
        // on initial step this will false, bc selected will contain only itemAll
        selected.length >= allOptions.length ||
        // so this will be true on initial step
        (selected.length === 1 && selected[0]?.key === "all")
    );

    // bc of different behavior of options list for single and multi mode
    const actualOptions = multiple && allSelected ? originOptions : allOptions;

    const handleSelect = useCallback(({ option, close = () => null }: IHandleSelectProps): void => {
        if (!multiple) {
            close();
            setSelected([ option ]);
        } else {
            if (!isSelected(option)) {
                setSelected((prevSelected) => [ ...prevSelected, option ]);
            }
        }
    }, [ selected ]);

    const handleSelectAll = useCallback(({ close = () => null }: IHandleSelectAllProps): void => {
        close();
        if (multiple) {
            setSelected(allOptions.map((item: ISelectOption) => item));
        } else {
            setSelected([ itemAll ])
        }
    }, [ allOptions ]);

    const handleUnselect = ({ option }: IHandleUnselectProps): void => {
        if (!allowUnselect) {
            return;
        }

        if (option.key === "all") {
            setSelected([]);
        } else {
            if (allSelected) {
                // bc we not show pseudo- itemAll item when all selected we should search in origin options
                const index = originOptions.findIndex((item) => item.key === option.key);
                if (index >= 0) {
                    setSelected([ ...originOptions.slice(0, index), ...originOptions.slice(index + 1) ]);
                }
            } else {
                // here we actually show itemAll bc not all items selected
                // so just search in selected list
                const index = selected.findIndex((item) => item.key === option.key);
                if (index >= 0) {
                    setSelected([ ...selected.slice(0, index), ...selected.slice(index + 1) ]);
                }
            }
        }
    };

    const handlePick = (index: number) => {
        const option = actualOptions[index];
        if (option) {
            if (!isSelected(option)) {
                handleSelect({ option });
            } else {
                handleUnselect({ option });
            }
        }
    };

    const renderChildren = ({ close }: IRenderDropdownChildrenProps) => {
        // if allowSelectAll first option equals to "itemAll"
        const [ firstOption, ...rest ] = allOptions;

        let children = rest.map(
            (option: ISelectOption) => renderItem({
                option,
                handleSelect,
                close,
                handleSelectAll,
                handleUnselect,
                isActive: allowSelectAll && multiple
                    ? allSelected || isSelected(option)
                    : isSelected(option)
            })
        );

        if (allowSelectAll) {
            // always show itemAll only for single mode (or if all not selected)
            if (!multiple || !allSelected) {
                children = [ renderSelectAll({
                    handleSelectAll,
                    close,
                    isActive: isSelected(firstOption)
                }) ].concat(children);
            }
        } else {
            children = [ renderItem({
                option: firstOption,
                handleSelect,
                close,
                handleSelectAll,
                handleUnselect,
                isActive: isSelected(firstOption)
            }) ].concat(children);
        }

        return children;
    };

    // fixing race condition, bc most actual "selected" will be available on next render
    useEffect(() => {
        onSelect(selected);
    }, [ selected ]);

    return (
        <StyledDropdown
            className={className}
            tabIndex={tabIndex}
            blockOpening={!actualOptions.length}
            // by default allow only for single select
            allowCircularNavigation={!multiple}
            navigateMinIndex={0}
            navigateFrom={0}
            navigateMaxIndex={allOptions.length - 1}
            navigable
            onPick={handlePick}
            renderTrigger={
                (props: IDropdownTriggerProps) => renderTrigger({
                    selected,
                    multiple,
                    handleUnselect,
                    allSelected,
                    ...props
                })
            }
        >
            {renderChildren}
        </StyledDropdown>
    );
};

export default Select;
