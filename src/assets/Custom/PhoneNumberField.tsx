
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { validatePhoneNumber } from "../../utils/Validation";
import { CustomPhoneWrapper } from "./PhoneNumberField.styled";

interface PhoneNumberFieldProps {
    value: string;
    onChange: (value: string) => void;
}




const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({ value, onChange }) => {
    const [error, setError] = React.useState("");

    const handlePhoneChange = (phone: string, countryData: any) => {
        if (countryData.countryCode === "in" && !phone.startsWith("91")) {
            phone = "91" + phone;
        }

        onChange(phone);

        if (phone.trim() === "" || phone === "91") {
            setError("This field is required");
            return;
        }

        const validation = validatePhoneNumber(phone, countryData.countryCode.toUpperCase());
        if (!validation.isValid) {
            setError(validation.error || "Invalid number");
        } else {
            setError("");
        }
    };

    return (
        <CustomPhoneWrapper>
            <PhoneInput
                country="in"
                value={value}
                onBlur={() => {
                    if (!value.trim()) setError("this field is required");
                }}
                onChange={handlePhoneChange}
                enableAreaCodes={false}
                disableCountryCode={false}
                disableDropdown={false}
                placeholder=""
                inputStyle={{
                    width: "100%", fontSize: "16px", paddingLeft: "48px", outline: "none",

                }}


            />
            {error && <p style={{ color: "#d32f2f", fontSize: "14px" }}>{error}</p>}
        </CustomPhoneWrapper>
    );
};

export default PhoneNumberField;
