import { setDefaultLocale } from "react-datepicker";
import React, { useContext, useEffect } from "react";

import { DataContext } from "~/providers/DataProvider";
import { IDataProviderContext, IItem } from "~/providers/DataProvider/types";

import { IDatePickerProps } from "./types";
import { StyledDatepicker } from "./styles";

setDefaultLocale("uk-UA");

const DatePicker = ({ onDateChange }: IDatePickerProps): JSX.Element => {
    const { date, setDate } = useContext<IDataProviderContext<IItem>>(DataContext);
    const handleDateChange = (selectedDate: Date) => {
        setDate(selectedDate);
    };

    // fixing race condition, bc onDataChange should be fired after date was changed
    useEffect(() => {
        onDateChange();
    }, [ date ]);

    return <StyledDatepicker onChange={handleDateChange} selected={date} showMonthYearPicker />;
};

export default DatePicker;
