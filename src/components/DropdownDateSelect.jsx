import moment from "moment";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { DropdownDate, DropdownComponent } from "react-dropdown-date";

const DropdownDateSelect = ({ date, setDate }) => {
  return (
    <div className="form-group">
      <DropdownDate
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
      />
    </div>
  );
};

export default DropdownDateSelect;
