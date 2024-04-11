import { isEmpty } from "lodash";

export function validateRegisterForm(email, password, confirmPassword) {
    let errors = {};

    if  (!email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid!";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
    }

    return {
        isValid: isEmpty(errors),
        errors
    }

}