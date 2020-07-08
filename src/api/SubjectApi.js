import {baseApi} from "./MwBaseApi";
import RequestType from "../enum/RequestType";


const baseUrl = "/subject";
const manageBaseUrl = "/manage/subject"


/**
 * 创建科目
 */
export const createSubjectApi = (obj) => {
    return baseApi(manageBaseUrl, JSON.stringify(obj), RequestType.POST);
};


/**
 * 按条件获取科目列表
 */
export const getSubjectListApi = (searchWord, desc, page, pageSize, valid, parentId) => {
    let queryParam = paramHandle(searchWord, valid, desc, parentId, page, pageSize);
    return baseApi(baseUrl + queryParam, null, RequestType.GET);
};

/**
 * 按条件获取科目数量
 */
export const countSubjectApi = (searchWord, parentId, valid) => {
    let queryParam = paramHandle(searchWord, valid, null, parentId, null, null);
    return baseApi(baseUrl + "/count" + queryParam, null, RequestType.GET);

};

/**
 * 根据ID获取科目
 */
export const getSubjectById = (subjectId) => {
    return baseApi(baseUrl + "/" + subjectId, null, RequestType.GET);
};

/**
 * 更新科目
 */
export const updateSubjectApi = (obj) => {
    return baseApi(manageBaseUrl, JSON.stringify(obj), RequestType.PUT);
};

/**
 * 禁用科目
 */
export const lockSubjectApi = (val) => {
    return baseApi(manageBaseUrl + "/lock/" + val, null, RequestType.PUT);
};

/**
 * 启用科目
 */
export const unLockSubjectApi = (val) => {
    return baseApi(manageBaseUrl + "/unlock/" + val, null, RequestType.PUT);
};

/**
 * 删除科目
 */
export const deleteSubjectApi = (val) => {
    return baseApi(manageBaseUrl + "/" + val, null, RequestType.DELETE);
};


/**
 * 参数处理
 */
const paramHandle = (searchWord, valid, desc, parentId, page, pageSize) => {
    let queryParam = "";
    if (searchWord != null && searchWord.length > 0) {
        queryParam = queryParam + "&searchWord=" + searchWord;
    }
    if (valid != null) {
        queryParam = queryParam + "&valid=" + valid;
    }
    if (desc != null && desc.length > 0) {
        queryParam = queryParam + "&desc=" + desc;
    }
    if (parentId != null) {
        queryParam = queryParam + "&parentId=" + parentId;
    }
    if (page != null) {
        queryParam = queryParam + "&page=" + page;
    }
    if (pageSize != null) {
        queryParam = queryParam + "&pageSize=" + pageSize;
    }
    if (queryParam.length > 0) {
        queryParam = "?" + queryParam.substr(1);
    }
    return queryParam;
};