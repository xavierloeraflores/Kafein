export function convertToAmPm(timeStr: string) {
  const [hourStr, minuteStr] = timeStr.split(":");
  if (!hourStr || !minuteStr) {
    return timeStr;
  }
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr.padStart(2, "0");

  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert hour to 12-hour format (0 becomes 12)

  return `${hour}:${minute} ${period}`;
}
