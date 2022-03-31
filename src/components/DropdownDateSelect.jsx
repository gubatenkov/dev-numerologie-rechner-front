import React from "react";
// eslint-disable-next-line no-unused-vars
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";

const DropdownDateSelect = ({ date, setDate }) => {
  return (
    <div className="form-group date-group">
      <DayPicker
        id={"day"}
        name={"day"}
        classes={"days"}
        optionClasses={"days-day"}
        month={date.month}
        year={date.year}
        // defaultValue={date.day} // mandatory
        endYearGiven // mandatory if end={} is given in YearPicker
        required={true} // default is false
        value={date.day} // mandatory
        onChange={day => {
          // mandatory

          setDate(prev => ({
            ...prev,
            day
          }));
        }}
      />
      <MonthPicker
        id={"month"}
        name={"month"}
        classes={"months"}
        optionClasses={"months-month"}
        // defaultValue={"Month"}
        // numeric // to get months as numbers
        // short // default is full name
        // caps // default is Titlecase
        endYearGiven // mandatory if end={} is given in YearPicker
        required={true} // default is false
        value={date.month} // mandatory
        onChange={month => {
          // mandatory

          setDate(prev => ({
            ...prev,
            month
          }));
        }}
      />

      <YearPicker
        id={"year"}
        name={"year"}
        classes={"years"}
        optionClasses={"years-year"}
        start={1922} // default is 1900
        end={new Date().getUTCFullYear()} // default is current year
        reverse // default is ASCENDING
        required={true} // default is false
        value={date.year} // mandatory
        onChange={year => {
          // mandatory
          setDate(prev => ({
            ...prev,
            year
          }));
        }}
      />
      {/* <DropdownDate
        startDate={
          // optional, if not provided 1900-01-01 is startDate
          "1922-01-01" // 'yyyy-mm-dd' format only
        }
        endDate={
          // optional, if not provided current date is endDate
          moment(new Date()).format("YYYY-MM-DD") // 'yyyy-mm-dd' format only
        }
        selectedDate={
          // optional
          date.selectedDate // 'yyyy-mm-dd' format only
        }
        onDateChange={date => {
          // optional
          setDate({
            date: date,
            selectedDate: moment(date).format("YYYY-MM-DD")
          });
        }}
      /> */}
    </div>
  );
};

export default DropdownDateSelect;
