import { useIntl } from "react-intl";
import React, { useContext, useEffect, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
import DateRange from "~/components/icons/DateRange";
import Dropdown from "~/components/core/Dropdown";
import getMonthsList from "~/helpers/getMonthsList";
import getRange from "~/helpers/getRange";

import { DataContext } from "~/providers/DataProvider";
import { DatePickerMode } from "~/components/core/Datepicker/constants";
import { DatePickerContainer, DatePickerItem, TriggerItem } from "./styles";

const MIN_YEAR = 2019;
const MAX_YEAR = 2050;

const DefaultTrigger = ({ selectedDate, toggle }: IDatePickerTriggerProps): JSX.Element => {
    const { locale } = useIntl();
    const month = selectedDate.toLocaleString(locale, { month: "long" });

    return (
        <>
            <TriggerItem onClick={() => toggle()}>
                {month} {selectedDate.getFullYear()} <DateRange width={24} />
            </TriggerItem>
        </>
    );
};

const DefaultItem = ({ onClick, value }: IDatePickerItemProps): JSX.Element => {
    return (
        <DatePickerItem onClick={onClick}>{value}</DatePickerItem>
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

    // fixing race condition, bc onDataChange should be fired after date was changed
    useEffect(() => {
        onDateChange();
    }, [ date ]);

    return (
        <Dropdown
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
            {({ close }: IRenderDropdownChildrenProps) => {
                return (
                    <DatePickerContainer>
                        <ConditionalRender condition={mode === DatePickerMode.SELECTING_YEAR}>
                            <div>
                                {yearRange.map((year: number) => renderItem({
                                    value: year.toString(),
                                    onClick: () => {
                                        handleDateChange({ year });
                                        setMode(DatePickerMode.SELECTING_MONTH);
                                    }
                                }))}
                            </div>
                        </ConditionalRender>
                        <ConditionalRender condition={mode === DatePickerMode.SELECTING_MONTH}>
                            <div>
                                {renderItem({
                                    value: date.getFullYear().toString(),
                                    onClick: () => setMode(DatePickerMode.SELECTING_YEAR)
                                })}
                                {monthsList.map((month: string, index: number) => renderItem({
                                    value: month,
                                    onClick: () => {
                                        handleDateChange({ month: index });
                                        close();
                                    }
                                }))}
                            </div>
                        </ConditionalRender>
                    </DatePickerContainer>
                )
            }}
        </Dropdown>
    );
};

export default DatePicker;
