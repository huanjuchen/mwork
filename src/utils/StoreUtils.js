import MwStore from "../store/MwStore";
import QueryStore from "../store/QueryStore"

const mwStoreKey = "MwStore";

const queryStoreKey = "QueryStore"

/**
 * 将Store的值存入sessionStorage
 * 避免刷新丢失
 */

export function saveStoreData() {
    saveQueryStore();
    saveMwStoreData();
}

function saveMwStoreData() {
    sessionStorage.setItem(mwStoreKey, JSON.stringify(MwStore));
}

function saveQueryStore() {
    sessionStorage.setItem(queryStoreKey, JSON.stringify(QueryStore));
}


/**
 * 从sessionStorage中获取Store的值
 *
 * 并清空sessionStorage
 */
export function getMwStoreData() {
    let obj = null;
    //获取JSON字符串
    let str = sessionStorage.getItem(mwStoreKey);
    //移除sessionStorage 中的值
    sessionStorage.removeItem(mwStoreKey);
    if (str != null && str.length > 0) {
        obj = JSON.parse(str);
    }
    return obj != null ? obj : null;
}

export function getQueryStoreData() {
    let obj = null;
    //获取JSON字符串
    let str = sessionStorage.getItem(queryStoreKey);
    //移除sessionStorage 中的值
    sessionStorage.removeItem(queryStoreKey);

    if (str != null && str.length > 0) {
        obj = JSON.parse(str);
    }
    return obj != null ? obj : null;
}