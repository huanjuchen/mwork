/**
 * 获取当前日期和时间
 */
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

/**
 * 日期格式化
 */
export function dateFormatter(value) {
    let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth();
    if (month < 9) {
        month = "0" + (month + 1);
    } else {
        month = "" + (month + 1);
    }
    let day = date.getDate();

    if (day < 10) {
        day = "0" + day;
    } else {
        day = "" + day;
    }
    return year + "-" + month + "-" + day;
}

/**
 *  时间格式化
 */
export function timeFormatter(value) {
    let date = new Date(value);
    let dateStr = dateFormatter(value);
    let hour = date.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    let mim = date.getMinutes();
    if (mim < 10) {
        mim = "0" + mim;
    }
    let sec = date.getSeconds();
    if (sec < 10) {
        sec = "0" + sec;
    }
    return dateStr + " " + hour + ":" + mim + ":" + sec;
}

/**
 * 获取当前时间戳
 */
export function getTimestamp() {
    return new Date().getTime();
}

/**
 * 获取月份的最后一天
 * @param year 年
 * @param month 月
 */
export function getLastDay(year,month) {
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        return 31;
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
    }
    return isLeapYear(year) ? 29 : 28;
}

/**
 * 获取是否为闰年
 */
export function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    } else return year % 4 === 0 && year % 100 !== 0;
}


