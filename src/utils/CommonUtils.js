export function deepCopy(obj) {
    let str = JSON.stringify(obj);
    return JSON.parse(str);
}

export function randomNumber() {
    return Math.floor(Math.random() * 10000);
}