import { setDefaultLocale } from "react-datepicker";
import React, { useContext } from "react";

import { DataContext } from "~/providers/DataProvider";
import { IDataProviderContext } from "~/providers/DataProvider/types";
import { IDatePickerProps } from "./types";
import { StyledDatepicker } from "./styles";

setDefaultLocale("ua");

const DatePicker = ({ onDateChange }: IDatePickerProps): JSX.Element => {
    const { date, setDate } = useContext<IDataProviderContext>(DataContext);
    const handleDateChange = (selectedDate: Date) => {
        console.log("selected:", selectedDate);
        setDate(selectedDate);
        onDateChange();
    };

    return <StyledDatepicker onChange={handleDateChange} selected={date} showMonthYearPicker />;
};

export default DatePicker;
