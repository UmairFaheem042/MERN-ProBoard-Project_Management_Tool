export function convertDatetime(datetimeStr) {
  let dt = new Date(datetimeStr);
  function getDaySuffix(day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return "st";
      case 2:
      case 22:
        return "nd";
      case 3:
      case 23:
        return "rd";
      default:
        return "th";
    }
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = dt.getDate();
  let daySuffix = getDaySuffix(day);
  let month = monthNames[dt.getMonth()];
  let year = dt.getFullYear();
  let hours = dt.getHours();
  let minutes = dt.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let formattedDatetime = `${dt.toLocaleString("en-US", {
    weekday: "short",
  })} ${day}${daySuffix} ${month} ${year} - ${hours}:${minutes} ${ampm}`;

  return formattedDatetime;
}
