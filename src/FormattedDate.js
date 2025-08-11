import React from "react";

export default function FormattedDate(props) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let utcDate = new Date(props.date.getTime() + props.timezone * 1000);
  let day = days[utcDate.getDay()];

  return <div>{day}</div>;
}
