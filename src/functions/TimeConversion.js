export const timeConversion = (ms) => {
    let secS = Math.round(ms / 1000);
    let min = (secS / 60).toFixed(2);

    let minResult = Math.floor(min).toString();
    let secResult = Math.round((min - minResult) * 60).toString();

    if (secResult <= 9 && secResult >= 0) {
        secResult = '0' + secResult;
    }

    return `${minResult}:${secResult}`;
};
