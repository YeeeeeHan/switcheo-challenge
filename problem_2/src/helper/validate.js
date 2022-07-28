export function validateAddress(add) {
    if (add.length === 0) {
        return "Please Enter Address";
    }

    if (add.length > 2 && add.slice(0,2) !== "0x") {
        return "Address must start with 0x";
    }
    return ""
}

export function validateAmount(num) {
    if (num <= 0) {
        return "Please Enter Positive Amount";
    }

    if (isNaN(num)) {
        return "Please Enter numeric value only";
    }
    return "";
}