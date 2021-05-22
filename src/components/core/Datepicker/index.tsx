import { useIntl } from "react-intl";
import React, { useContext, useEffect, useState } from "react";

import ConditionalRender from "~/components/core/ConditionalRender";
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
        <TriggerItem onClick={() => toggle()}>
            {month} {selectedDate.getFullYear()}
        </TriggerItem>
    );
};

const DefaultItem = ({ onClick, value }: IDatePickerItemProps): JSX.Element => {
    return (
        <DatePickerItem onClick={onClick}>{value}</DatePickerItem>
    )
};

const DatePicker = ({ onDateChange, renderTrigger = DefaultTrigger, renderItem = DefaultItem }: IDatePickerProps): JSX.Element => {
    const { locale } = useIntl();
    const monthsList = getMonthsList(locale);
    const yearRange = getRange(MIN_YEAR, MAX_YEAR);

    const { date, setDate } = useContext<IDataProviderContext<IItem>>(DataContext);

    const [ mode, setMode ] = useState<DatePickerMode>(DatePickerMode.SELECTING_MONTH);

    const handleDateChange = ({ month, year }: IDatePickerHandleChangeProps): void => {
        const date = new Date();
        year && date.setFullYear(year);
        month && date.setMonth(month);

        setDate(date);
    };

    // fixing race condition, bc onDataChange should be fired after date was changed
    useEffect(() => {
        onDateChange();
    }, [ date ]);

    return (
        <Dropdown renderTrigger={(props: IDropdownTriggerProps) => renderTrigger({ selectedDate: date, ...props })}
                  onClose={() => {
                      setMode(DatePickerMode.SELECTING_MONTH);
                  }}>
            {({ close }: IRenderDropdownChildrenProps) => {
                return (
                    <DatePickerContainer>
                        <ConditionalRender condition={mode === DatePickerMode.SELECTING_YEAR}>
                            <>
                                {yearRange.map((year: number) => renderItem({
                                    value: year.toString(),
                                    onClick: () => {
                                        handleDateChange({ year });
                                        setMode(DatePickerMode.SELECTING_MONTH);
                                    }
                                }))}
                            </>
                        </ConditionalRender>
                        <ConditionalRender condition={mode === DatePickerMode.SELECTING_MONTH}>
                            <>
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
                            </>
                        </ConditionalRender>
                    </DatePickerContainer>
                )
            }}
        </Dropdown>
    );
};

export default DatePicker;
