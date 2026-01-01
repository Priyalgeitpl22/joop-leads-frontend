export const formatDateTime = (timestamp: string | number | Date): string | null => {
  if (!timestamp) return null

  const date = new Date(timestamp);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date).replace(",", "")
    .replace("AM", "am")
    .replace("PM", "pm")
    .replace(" at", " at ");
};

/**
 * Convert ISO string to datetime-local format
 * @param isoString - ISO string
 * @returns datetime-local format
 */
export const toDatetimeLocal = (isoString: string | null) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  const pad = (n: number) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
