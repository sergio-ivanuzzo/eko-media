import { setDefaultLocale } from "react-datepicker";
import React, { useContext, useEffect } from "react";

import { DataContext } from "~/providers/DataProvider";
import { IDataProviderContext } from "~/providers/DataProvider/types";
import { IDatePickerProps } from "./types";
import { StyledDatepicker } from "./styles";

setDefaultLocale("uk-UA");

const DatePicker = ({ onDateChange }: IDatePickerProps): JSX.Element => {
    const { date, setDate } = useContext<IDataProviderContext>(DataContext);
    const handleDateChange = (selectedDate: Date) => {
        setDate(selectedDate);
    };

    // onChange handler should be called after "date" was changed
    useEffect(() => {
        onDateChange(date);
    }, [ date ]);

    return <StyledDatepicker onChange={handleDateChange} selected={date} showMonthYearPicker />;
};

export default DatePicker;
