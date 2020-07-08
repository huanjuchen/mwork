import {baseApi} from "./MwBaseApi";
import RequestType from "../enum/RequestType";

const url = "/admin/user";


/**
 * 创建用户
 */
export const createUserApi = (user) => {
    return baseApi(url, JSON.stringify(user), RequestType.POST);
};


/**
 * 根据条件获取用户
 */
export const getUsersApi = (page, pageSize, selectWord, valid, desc) => {
    let q = paramHandle(page, pageSize, selectWord, valid, desc);
    return baseApi(url + q, null, RequestType.GET);
}

/**
 * 根据条件获取用户数
 */
export const getUsersCountApi = (selectWord, valid) => {
    let q = paramHandle(null, null, selectWord, valid, null);
    return baseApi(url + "/count" + q, null, RequestType.GET)
}


//重置密码
export const resetPwdApi = (userId) => {
    return baseApi(url + "/resetPwd/" + userId, null, RequestType.PUT);
};
//禁用用户
export const lockUserApi = (userId) => {
    return baseApi(url + "/lock/" + userId, null, RequestType.PUT);
};
//启用用户
export const unlockUserApi = (userId) => {
    return baseApi(url + "/unlock/" + userId, null, RequestType.PUT);
};


/**
 * 参数处理
 *
 * @param page 页码
 * @param pageSize 每页条数
 * @param selectWord 搜索关键字
 * @param valid 用户状态
 * @param desc 是否倒序
 */
const paramHandle = (page, pageSize, selectWord, valid, desc) => {
    let queryParam = "";
    if (page != null) {
        queryParam = queryParam + "&page=" + page;
    }
    if (pageSize != null) {
        queryParam = queryParam + "&pageSize=" + pageSize;
    }
    if (selectWord != null && selectWord.length > 0) {
        queryParam = queryParam + "&selectWord=" + selectWord;
    }
    if (valid != null) {
        queryParam = queryParam + "&valid=" + valid;
    }
    if (desc != null) {
        queryParam = queryParam + "&desc=" + desc;
    }
    if (queryParam.length > 0) {
        queryParam = "?" + queryParam.substr(1);
    }
    return queryParam;
}
