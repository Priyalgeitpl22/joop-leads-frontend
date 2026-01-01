/**
 * Convert a UTC date to a specific timezone and format it
 * @param utcDate - The UTC date string or Date object
 * @param timezone - The IANA timezone string (e.g., "America/New_York", "Asia/Kolkata")
 * @param format - The desired output format (simplified format tokens)
 * @returns Formatted date string in the specified timezone
 */
export function convertUtcToTimezone(
  utcDate: string | Date,
  timezone: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string {
  const date = new Date(utcDate);

  // Get date parts in the target timezone
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);
  const getPart = (type: string) =>
    parts.find((p) => p.type === type)?.value || "";

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour24 = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  // Convert to 12-hour format
  const hour24Num = parseInt(hour24, 10);
  const hour12 = hour24Num === 0 ? 12 : hour24Num > 12 ? hour24Num - 12 : hour24Num;
  const hour12Padded = hour12.toString().padStart(2, "0");
  const ampm = hour24Num >= 12 ? "PM" : "AM";

  // Get month name
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];

  // Replace format tokens
  let result = format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hour24)
    .replace("hh", hour12Padded)
    .replace("mm", minute)
    .replace("ss", second)
    .replace("A", ampm)
    .replace("MMM", monthName);

  // Handle "DD MMM YYYY" pattern (day followed by month name)
  if (format.includes("DD MMM")) {
    result = result.replace(day + " " + month, day + " " + monthName);
  }

  return result;
}

export function formatDateWithGMT(dateInput: string | Date) {
  const date = new Date(dateInput);

  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  }).format(date);

  return formatted;
}
