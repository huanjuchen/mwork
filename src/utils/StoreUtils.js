import MwStore from "../store/MwStore";

const storeKey = "MwStore";

/**
 * 将Store的值存入sessionStorage
 * 避免刷新丢失
 */
export function saveStoreData() {
    sessionStorage.setItem(storeKey, JSON.stringify(MwStore));
}


/**
 * 从sessionStorage中获取Store的值
 *
 * 并清空sessionStorage
 */
export function getStoreData() {
    let obj = null;
    //获取JSON字符串
    let str = sessionStorage.getItem(storeKey);
    //移除sessionStorage 中的值
    sessionStorage.removeItem(storeKey);
    if (str != null && str.length > 0) {
        obj = JSON.parse(str);
    }
    return obj != null ? obj : null;
}