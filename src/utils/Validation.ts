

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};


export interface FieldValidationRule {
  required?: { message: string };
  minLength?: { value: number; message: string };
  email?: { message: string };
  pattern?: { value: string; message: string };
}

export type FieldValidationConfig = {
  [key in "fullName" | "email" | "orgName" | "domain" | "password"]?: FieldValidationRule;
} & {
  [key: string]: FieldValidationRule | undefined;
};

const fieldValidation: FieldValidationConfig = {
  fullName: {
    required: { message: "Full Name is required" },
    minLength: { value: 3, message: "Full Name must be at least 3 characters" }
  },
  email: {
    required: { message: "Email is required" },
    pattern: { value: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message: "Email is not valid" }
  },
  orgName: {
    required: { message: "Company Name is required" }
  },
  domain: {
    required: { message: "domain Number is required" },
  },
  password: {
    required: { message: "Password is required" },
    minLength: { value: 6, message: "Password must be at least 6 characters" },
    pattern: { value: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).+$", message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" }
  }
};

export default fieldValidation;