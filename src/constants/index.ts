import { AlertTriangle, Ban, Mail, UserX } from "lucide-react";

export const DAYS_OF_WEEK = [
    { key: 'Mon', label: 'Mon' },
    { key: 'Tue', label: 'Tue' },
    { key: 'Wed', label: 'Wed' },
    { key: 'Thu', label: 'Thu' },
    { key: 'Fri', label: 'Fri' },
    { key: 'Sat', label: 'Sat' },
    { key: 'Sun', label: 'Sun' },
];

export const TIMEZONES = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Kolkata', label: 'India (IST)' },
];

export const CONTACT_FIELD_OPTIONS = [
    { key: "email", label: "Email", required: true },
    { key: "firstName", label: "First Name", required: true },
    { key: "lastName", label: "Last Name" },
    { key: "company", label: "Company Name" },
    { key: "designation", label: "Designation" },
    { key: "industry", label: "Industry Type" },
    { key: "linkedinUrl", label: "LinkedIn Profile" },
    { key: "website", label: "Website" },
    { key: "phone", label: "Phone Number" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "country", label: "Country" },
];

export const WIZARD_STEPS = [
    { id: "import-leads", label: "Import Leads" },
    { id: "sequences", label: "Sequences" },
    { id: "setup", label: "Setup" },
    { id: "review", label: "Final Review" },
];

export const STATUS_ITEMS = [
    { key: 'duplicates', label: 'Duplicate Leads', Icon: AlertTriangle },
    { key: 'blocked', label: 'Blocked Email Count', Icon: Ban },
    { key: 'empty', label: 'Empty Email Count', Icon: Mail },
    { key: 'invalid', label: 'Invalid Email Count', Icon: Ban },
    { key: 'unsubscribed', label: 'Unsubscribed Leads', Icon: UserX },
];