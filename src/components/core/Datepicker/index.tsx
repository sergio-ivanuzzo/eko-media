import React, { useState } from "react";

import { StyledDatepicker } from "./styles";
import { IDatePickerProps } from "./types";

const DatePicker = ({ onDateChange }: IDatePickerProps) => {
    const [date, setDate] = useState<Date | Date[]>(new Date());
    const handleDateChange = (date: Date | Date[]) => {
        onDateChange(date);
        setDate(date);
    };
    return <StyledDatepicker onChange={handleDateChange} value={date} />;
};

export default DatePicker;
