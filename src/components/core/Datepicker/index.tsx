import React, { useState } from "react";
import { setDefaultLocale } from "react-datepicker";

import { StyledDatepicker } from "./styles";
import { IDatePickerProps } from "./types";

setDefaultLocale("ua");

const DatePicker = ({ onDateChange }: IDatePickerProps): JSX.Element => {
    const [date, setDate] = useState<Date>(new Date());
    const handleDateChange = (date: Date) => {
        onDateChange(date);
        setDate(date);
    };
    return <StyledDatepicker onChange={handleDateChange} selected={date} showMonthYearPicker />;
};

export default DatePicker;
