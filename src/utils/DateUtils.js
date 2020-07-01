export function getNow() {
    let date = new Date();
    let year, month, day, hour, mim, second;
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    if (month < 9) {
        month = "0" + (month + 1);
    } else {
        month = "" + (month + 1);
    }
    if (day < 10) {
        day = "0" + day;
    } else {
        day = "" + day;
    }
    hour = date.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    mim = date.getMinutes();
    if (mim < 10) {
        mim = "0" + mim;
    }
    second = date.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }
    return year + "-" + month + "-" + day +
        " " + hour + ":" + mim + ":" + second;

}