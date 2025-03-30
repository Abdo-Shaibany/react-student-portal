export const YemenPhoneValidations = {
    required: "Phone is required",
    pattern: {
        value: /^7[7380]\d{7}$/,
        message:
            "Invalid phone number. Must start with 7 followed by 7, 3, 8, or 0 and then 7 digits.",
    },
}