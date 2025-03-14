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

