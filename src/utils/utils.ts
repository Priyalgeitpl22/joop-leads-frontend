export const formatTimestamp = (createdAt: string): string => {
  const messageTime = new Date(createdAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  if (messageTime >= today) {
    return messageTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } else if (messageTime >= yesterday && messageTime < today) {
    return "Yesterday";
  } else {
    return messageTime.toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const formatDateTime = (timestamp: string | number | Date): any => {
  if(!timestamp) return null

  const date = new Date(timestamp);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date).replace(",", "") // Remove extra comma
    .replace("AM", "am")
    .replace("PM", "pm")
    .replace(" at", " at "); // Ensures spacing is correct
};

export const formatDateOnly = (timestamp: string | number | Date): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date).replace(",", "") // Remove extra comma
};

/**
 * Formats a date/time string in the format: "Sat 29 Nov, 17:12 (1 day ago)"
 * @param timestamp - Date string, number, or Date object
 * @returns Formatted date string with relative time
 */
export const formatDateTimeWithRelative = (timestamp: string | number | Date): string => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const now = new Date();
  
  // Format date part: "Sat 29 Nov"
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
  const dayOfMonth = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  
  // Format time in 24-hour format: "17:12"
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  
  // Calculate relative time
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);
  
  let relativeTime = "";
  
  if (diffInSeconds < 60) {
    relativeTime = "just now";
  } else if (diffInMinutes < 60) {
    relativeTime = `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInHours < 24) {
    relativeTime = `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  } else if (diffInDays < 7) {
    relativeTime = `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  } else if (diffInWeeks < 4) {
    relativeTime = `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  } else if (diffInMonths < 12) {
    relativeTime = `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  } else {
    relativeTime = `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
  }
  
  return `${dayOfWeek} ${dayOfMonth} ${month}, ${time} (${relativeTime})`;
};

