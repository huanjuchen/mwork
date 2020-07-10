export function deepCopy(obj) {
    let str = JSON.stringify(obj);
    return JSON.parse(str);
}

export function randomNumber() {
    return Math.floor(Math.random() * 10000);
}

export function decimalAdd(arg1, arg2) {
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m + arg2 * m) / m).toFixed(n);
}