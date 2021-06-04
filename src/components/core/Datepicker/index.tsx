import { useIntl } from "react-intl";
import React, { useContext, useEffect, useState } from "react";

import DateRange from "~/components/icons/DateRange";
import getMonthsList from "~/helpers/getMonthsList";
import getRange from "~/helpers/getRange";

import { DataContext } from "~/providers/DataProvider";
import { DatePickerMode } from "~/components/core/Datepicker/constants";
import { DatePickerItem, StyledDropdown, TriggerContainer, TriggerItem } from "./styles";

const MIN_YEAR = 2019;
const MAX_YEAR = 2050;

const DefaultTrigger = ({ selectedDate, toggle }: IDatePickerTriggerProps): JSX.Element => {
    const { locale } = useIntl();
    const month = selectedDate.toLocaleString(locale, { month: "long" });

    return (
        <TriggerContainer>
            <TriggerItem onClick={() => toggle()}>
                {month} {selectedDate.getFullYear()} <DateRange width={24} />
            </TriggerItem>
        </TriggerContainer>
    );
};

const DefaultItem = ({ onClick, value, isActive }: IDatePickerItemProps): JSX.Element => {
    return (
        <DatePickerItem isActive={isActive} onClick={onClick}>{value}</DatePickerItem>
    )
};

const DatePicker = (props: IDatePickerProps): JSX.Element => {
    const {
        onDateChange,
        renderTrigger = DefaultTrigger,
        renderItem = DefaultItem,
        className = "",
        tabIndex,
    } = props;

    const { locale } = useIntl();
    const monthsList = getMonthsList(locale);
    const yearRange = getRange(MIN_YEAR, MAX_YEAR);

    const { date, setDate } = useContext<IDataProviderContext<IItem>>(DataContext);
    const [ mode, setMode ] = useState<DatePickerMode>(DatePickerMode.SELECTING_MONTH);

    const handleDateChange = ({ month, year }: IDatePickerHandleChangeProps): void => {
        const newDate = new Date(date);
        // reset day to 1st to avoid of setting incorrect month on change
        // for example, if today is 29 and we set February, the March will be set instead
        newDate.setDate(1);

        typeof year === "number" && newDate.setFullYear(year);
        typeof month === "number" && newDate.setMonth(month);

        setDate(newDate);
    };

    const handlePick = (index: number) => {
        if (mode === DatePickerMode.SELECTING_YEAR) {
            handleDateChange({
                year: yearRange[index]
            });
            setMode(DatePickerMode.SELECTING_MONTH);
        } else {
            if (index === 0) {
                setMode(DatePickerMode.SELECTING_YEAR);
            } else {
                // index - 1 bc first item is switch to year mode
                handleDateChange({
                    month: index - 1
                })
            }
        }
    };

    const renderChildren = ({ close }: IRenderDropdownChildrenProps) => {
        if (mode === DatePickerMode.SELECTING_YEAR) {
            return yearRange.map((year: number) => renderItem({
                value: year.toString(),
                isActive: year === date.getFullYear(),
                onClick: () => {
                    handleDateChange({ year });
                    setMode(DatePickerMode.SELECTING_MONTH);
                }
            }));
        } else {
            const switchItem = renderItem({
                value: date.getFullYear().toString(),
                onClick: () => setMode(DatePickerMode.SELECTING_YEAR)
            });

            return [ switchItem ].concat(monthsList.map((month: string, index: number) => renderItem({
                value: month,
                isActive: date.toLocaleString(locale, { month: "long" }) === month,
                onClick: () => {
                    handleDateChange({ month: index });
                    close();
                }
            })));
        }
    };

    // fixing race condition, bc onDataChange should be fired after date was changed
    useEffect(() => {
        onDateChange();
    }, [ date ]);

    return (
        <StyledDropdown
            navigable
            navigateMaxIndex={mode === DatePickerMode.SELECTING_YEAR ? yearRange.length - 1 : monthsList.length}
            onPick={handlePick}
            className={className}
            tabIndex={tabIndex}
            renderTrigger={
                (props: IDropdownTriggerProps) => renderTrigger({
                    selectedDate: date,
                    ...props
                })
            }
            onClose={
                () => setMode(DatePickerMode.SELECTING_MONTH)
            }
        >
            {renderChildren}
        </StyledDropdown>
    );
};

export default DatePicker;
