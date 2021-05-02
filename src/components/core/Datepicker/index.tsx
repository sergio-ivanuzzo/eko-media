import { setDefaultLocale } from "react-datepicker";
import React, { useState } from "react";

import { IDatePickerProps } from "./types";
import { StyledDatepicker } from "./styles";

setDefaultLocale("ua");

const DatePicker = ({ onDateChange }: IDatePickerProps): JSX.Element => {
    const [ date, setDate ] = useState<Date>(new Date());
    const handleDateChange = (selectedDate: Date) => {
        setDate(selectedDate);
        onDateChange(selectedDate);
    };

    return <StyledDatepicker onChange={handleDateChange} selected={date} showMonthYearPicker />;
};

export default DatePicker;
