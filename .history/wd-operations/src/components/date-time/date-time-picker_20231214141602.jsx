"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format, parse, set } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

import { useTimePicker } from "../../store/maps/use-location-picker";

export const DateTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const addStartTime = useTimePicker((state) => state.addStartTime);
  const addStartDate = useTimePicker((state) => state.addStartDate);
  const addEndTime = useTimePicker((state) => state.addEndTime);
  const addStartTimePicker = useTimePicker((state) => state.addStartTimePicker);
  const addEndTimePicker = useTimePicker((state) => state.addEndTimePicker);
  const { isTimePicker } = useTimePicker();

  useEffect(() => {
    const dateStr = startDate.toLocaleDateString();
    const timeStr = startTime.toLocaleTimeString();

    console.log("Debug - dateStr:", dateStr);
    console.log("Debug - timeStr:", timeStr);
    // Define regular expressions for the two possible formats
    const format1Regex =
      /^(0[1-9]|[12][0-9]|3[01])(\/|-)(0[1-9]|1[1,2])(\/|-)(19|20)\d{2}$/; // "dd/MM/yyyy"
    const format2Regex =
      /^(0[1-9]|1[1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])(\/|-)(19|20)\d{2}$/; // "MM/dd/yyyy"

    // Check which format the date string belongs to
    let dateFormat, timeFormat;

    if (format1Regex.test(dateStr)) {
      dateFormat = "dd/MM/yyyy";
    } else if (format2Regex.test(dateStr)) {
      dateFormat = "MM/dd/yyyy";
    } else {
      console.error("Invalid date format");
    }

    // Assume time is always in "hh:mm:ss a" format
    timeFormat = "hh:mm:ss a";

    // Parse the date and time using the determined formats
    const date = parse(dateStr, dateFormat, new Date());
    const time = parse(timeStr, timeFormat, new Date());

    // Format the date and time using the desired format
    const desiredDateFormat = "MM/dd/yyyy";
    const desiredTimeFormat = "h:mm:ss a";

    const formattedDate = format(date, desiredDateFormat);
    const formattedTime = format(time, desiredTimeFormat);

    console.log("Format Date:", formattedDate, formattedTime);

    const combinedStartTimeDate = set(new Date(formattedDate), {
      hours: new Date(formattedTime).getHours(),
      minutes: new Date(formattedTime).getMinutes(),
    });

    console.log("Debug - combinedStartTimeDate:", combinedStartTimeDate);

    console.log("Combined Start Time Date: ", combinedStartTimeDate);

    addStartTime({
      combinedStartTimeDate,
    });
    addStartDate(startDate);

    addStartTimePicker({
      startDate: startDate,
      startTime: combinedStartTimeDate,
    });

    // console.log("Start Time (g)", timeDate.isStartTime)
    // console.log("Start Date (g)", timeDate.isStartDate)
    // console.log("Is Time Picker (Start)", isTimePicker)
  }, [startTime]);

  useEffect(() => {
    const dateStr = startDate.toLocaleDateString();
    const timeStr = endTime.toLocaleTimeString();

    console.log("Debug - dateStr:", dateStr);
    console.log("Debug - timeStr:", timeStr);

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Matches "dd/MM/yyyy" format
    const timeRegex = /^\d{2}:\d{2}:\d{2} [APMapm]{2}$/; // Matches "hh:mm:ss a" format

    let combinedEndTimeDate = "";

    if (dateRegex.test(dateStr) && timeRegex.test(timeStr)) {
      console.log("Date Format 'dd/MM/yyyy'");
      const originalFormat = "dd/MM/yyyy";
      const date = parse(dateStr, originalFormat, new Date());
      const time = parse(timeStr, "HH:mm:ss", new Date()); // Use 24-hour format for time

      // Format the date and time using the new format
      const newDateFormat = "MM/dd/yyyy";
      const newTimeFormat = "h:mm:ss a";

      const formattedDate = format(date, newDateFormat);
      const formattedTime = format(time, newTimeFormat);

      combinedEndTimeDate = set(formattedDate, {
        hours: formattedTime.getHours(),
        minutes: formattedTime.getMinutes(),
      });
    } else {
      console.log("date or time format MM/dd/yyyy");

      const date = parse(dateStr, "MM/dd/yyyy", new Date());
      const time = parse(timeStr, "h:mm:ss a", new Date());

      console.log("Debug - parsed date:", date);
      console.log("Debug - parsed time:", time);

      combinedEndTimeDate = set(date, {
        hours: time.getHours(),
        minutes: time.getMinutes(),
      });
    }

    // console.log("Combined End Time Date: ", combinedEndTimeDate);

    addEndTime({ combinedEndTimeDate: combinedEndTimeDate });

    addEndTimePicker({
      endTime: combinedEndTimeDate,
    });
    // console.log("End Time (g)", timeDate.isEndTime)
    // console.log("IsTimePiker (End)", isTimePicker);
  }, [endTime]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3">
      <div className="md:col-span-2">
        <DatePicker
          selected={startDate}
          className="text-sm border rounded-lg p-2 flex items-center justify-center cursor-pointer focus:ring-transparent focus:shadow-md"
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className=" flex flex-col md:col-span-1">
        <span className="text-muted-foreground text-sm">From:</span>
        <DatePicker
          selected={startTime}
          className="text-sm border rounded-lg p-2 flex items-center justify-center cursor-pointer focus:ring-transparent focus:shadow-md"
          onChange={(time) => setStartTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h: mm aa"
        />
      </div>
      <div className="md:col-span-1 flex flex-col">
        <span className="text-muted-foreground text-sm">To:</span>
        <DatePicker
          selected={endTime}
          className="text-sm border rounded-lg p-2 flex items-center justify-center cursor-pointer focus:ring-transparent focus:shadow-md"
          onChange={(time) => setEndTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h: mm aa"
        />
      </div>
    </div>
  );
};
