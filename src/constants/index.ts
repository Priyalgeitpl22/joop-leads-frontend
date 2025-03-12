export const CSV_COLUMNS = [
  { key: "first_name", label: "First Name", required : true},
  { key: "last_name", label: "Last Name"},
  { key: "email", label: "Email", required : true },
  { key: "phone_number", label: "Phone Number" },
  { key: "company_name", label: "Company Name" },
  { key: "website", label: "Website" },
  { key: "linkedin_profile", label: "Linkedin Profile" },
  { key: "location", label: "Location" },
  { key: "ignore_field", label: "Ignore Field" }
];


export const timeZones = [
  { key: "UTC", value: "Coordinated Universal Time (UTC)" },
  { key: "PST", value: "Pacific Standard Time (PST, UTC-8)" },
  { key: "PDT", value: "Pacific Daylight Time (PDT, UTC-7)" },
  { key: "MST", value: "Mountain Standard Time (MST, UTC-7)" },
  { key: "MDT", value: "Mountain Daylight Time (MDT, UTC-6)" },
  { key: "CST", value: "Central Standard Time (CST, UTC-6)" },
  { key: "CDT", value: "Central Daylight Time (CDT, UTC-5)" },
  { key: "EST", value: "Eastern Standard Time (EST, UTC-5)" },
  { key: "EDT", value: "Eastern Daylight Time (EDT, UTC-4)" },
  { key: "BST", value: "British Summer Time (BST, UTC+1)" },
  { key: "CET", value: "Central European Time (CET, UTC+1)" },
  { key: "CEST", value: "Central European Summer Time (CEST, UTC+2)" },
  { key: "EET", value: "Eastern European Time (EET, UTC+2)" },
  { key: "EEST", value: "Eastern European Summer Time (EEST, UTC+3)" },
  { key: "IST", value: "Indian Standard Time (IST, UTC+5:30)" },
  { key: "CST_China", value: "China Standard Time (CST, UTC+8)" },
  { key: "JST", value: "Japan Standard Time (JST, UTC+9)" },
  { key: "KST", value: "Korea Standard Time (KST, UTC+9)" },
  { key: "AEST", value: "Australian Eastern Standard Time (AEST, UTC+10)" },
  { key: "AEDT", value: "Australian Eastern Daylight Time (AEDT, UTC+11)" },
  { key: "ACST", value: "Australian Central Standard Time (ACST, UTC+9:30)" },
  { key: "AWST", value: "Australian Western Standard Time (AWST, UTC+8)" },
  { key: "NZST", value: "New Zealand Standard Time (NZST, UTC+12)" },
  { key: "NZDT", value: "New Zealand Daylight Time (NZDT, UTC+13)" }
];

export default timeZones;
