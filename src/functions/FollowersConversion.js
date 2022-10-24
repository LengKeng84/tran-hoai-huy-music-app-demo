export const followersConversion = (number) => {
    if (number >= 0 && number <= 999) {
        return number;
    }
    if (number >= 1000 && number <= 999999) {
        return `${Math.round(number * 0.001)} N`;
    }
    if (number >= 1000000 && number <= 999999999) {
        return `${Math.round(number * 0.000001)} Tr`;
    }
};
