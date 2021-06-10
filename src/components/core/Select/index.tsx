import { FormattedMessage, useIntl } from "react-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import Close from "~/components/icons/Close";
import ConditionalRender from "~/components/core/ConditionalRender";
import Placeholder from "~/components/core/Placeholder";
import useDetectArrayResize from "~/hooks/useDetectArrayResize";
import useElementSize from "~/hooks/useElementSize";

import { JustifyContent } from "~/components/global.constants";
import { MOUSE_BUTTON } from "~/common/constants";
import { Badge, CloseButton, MenuItem, StyledDropdown, TriggerContainer, TriggerItem } from "./styles";

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
    const { toggle, multiple = false, handleUnselect, allMultipleSelected = false } = props;

    // show only itemAll (in case if all selected) only for multiple mode
    // for single mode always show itemAll and rest of items
    const selected = allMultipleSelected ? originSelected.slice(0, 1) : originSelected;
    const { ref: containerRef, width } = useElementSize();

    // calculate badge value (wrapped items)
    const [ wrappedAmount, setWrappedAmount ] = useState(0);
    useEffect(() => {
        if (!selected.length || allMultipleSelected) {
            setWrappedAmount(0);
        }
        const element: HTMLElement = containerRef.current;
        if (element) {
            const children = Array.from(element.children);
            const firstItemTopOffset = (children[0] as HTMLElement).getBoundingClientRect().top;
            const firstWrapped = children.findIndex(
                (child) => {
                    return (child as HTMLElement).getBoundingClientRect().top > firstItemTopOffset;
                }
            );
            if (firstWrapped >= 0) {
                setWrappedAmount(children.length - firstWrapped);
            } else {
                setWrappedAmount(0);
            }
        }
    }, [ containerRef, selected, allMultipleSelected, width ]);

    return (
        <TriggerContainer {...props} onClick={() => toggle()}>
            <ConditionalRender condition={!!selected.length}>
                <>
                    <div ref={containerRef}>
                        {selected.map((item: ISelectOption) => (
                            <TriggerItem key={item.key}
                                         multiple={multiple}
                                         onMouseDown={(e: React.MouseEvent) => {
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
                    </div>
                    <div>
                        <ConditionalRender condition={!!wrappedAmount && multiple}>
                            <Badge>{wrappedAmount}</Badge>
                        </ConditionalRender>
                    </div>
                </>
                <Placeholder primaryAlign={JustifyContent.START}>
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

    const [ selected, setSelected ] = useState<ISelectOption[]>(value);

    const isSelected = useCallback(
        (option: ISelectOption) => selected.map((item) => item.key).includes(option.key),
        [ selected ]
    );
    // to check if all items are selected with handleSelectAll
    const allMultipleSelected = useMemo(() => multiple && allowSelectAll && (
        // on initial step this will false, bc selected will contain only itemAll
        selected.length >= allOptions.length ||
        // so this will be true on initial step
        (selected.length === 1 && selected[0]?.key === "all")
    ), [ multiple, allowSelectAll, allOptions, selected ]);

    // bc of different behavior of options list for single and multi mode
    // (we hide itemAll when all items selected in multimode)
    const actualOptions = useMemo(
        () => allMultipleSelected ? originOptions : allOptions,
        [ allMultipleSelected, originOptions, allOptions ]
    );

    const handleSelect = useCallback(({ option, close = () => null }: IHandleSelectProps): void => {
        if (!multiple) {
            close();
            setSelected([ option ]);
        } else {
            if (!isSelected(option)) {
                setSelected((prevSelected) => [ ...prevSelected, option ]);
            }
        }
    }, [ selected, multiple, isSelected ]);

    const handleSelectAll = useCallback(({ close = () => null }: IHandleSelectAllProps = {}): void => {
        if (multiple) {
            setSelected(allOptions.map((item: ISelectOption) => item));
        } else {
            setSelected([ itemAll ]);
        }
        close();
    }, [ allOptions ]);

    const handleUnselect = ({ option }: IHandleUnselectProps): void => {
        if (!allowUnselect) {
            return;
        }

        if (option.key === "all") {
            setSelected([]);
        } else {
            if (allMultipleSelected) {
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
            if (option.key === "all") {
                handleSelectAll();
            } else if (allMultipleSelected || isSelected(option)) {
                handleUnselect({ option });
            } else {
                handleSelect({ option });
            }
        }
    };

    const renderChildren = ({ close }: IRenderDropdownChildrenProps) => {
        if (!originOptions.length) {
            return [];
        }
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
                    ? allMultipleSelected || isSelected(option)
                    : isSelected(option)
            })
        );

        if (allowSelectAll) {
            // always show itemAll only for single mode (or if all not selected)
            if (!multiple || !allMultipleSelected) {
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

    const [ navigationOffset ] = useDetectArrayResize(actualOptions);

    useEffect(() => {
        if (originOptions.length) {
            allowSelectAll && setSelected([ itemAll ]);
        } else {
            setSelected([]);
        }
    }, [ originOptions, allowSelectAll ]);

    return (
        <StyledDropdown
            className={className}
            tabIndex={tabIndex}
            blockOpening={!actualOptions.length}
            navigationOffset={navigationOffset}
            navigateMaxIndex={actualOptions.length - 1}
            navigable
            onPick={handlePick}
            renderTrigger={
                (props: IDropdownTriggerProps) => renderTrigger({
                    selected,
                    multiple,
                    handleUnselect,
                    allMultipleSelected: allMultipleSelected,
                    ...props
                })
            }
        >
            {renderChildren}
        </StyledDropdown>
    );
};

export default Select;
