import {baseApi} from "./MwBaseApi";
import RequestType from "../enum/RequestType";

const baseUrl = "/proof";
const manageUrl = "/manage/proof"


export const createProofApi = function (obj) {
    return baseApi(baseUrl, JSON.stringify(obj), RequestType.POST);
}


export const getProofListApi = function (rid, startDate, endDate,
                                         verify, orderType, page, pageSize) {
    let q = paramHandle(rid, startDate, endDate, verify, orderType, page, pageSize);

    return baseApi(baseUrl + q, null, RequestType.GET);
}

export const getProofCountApi = function (rid, startDate, endDate, verify) {
    let q = paramHandle(rid, startDate, endDate, verify, null, null, null);
    return baseApi(baseUrl + "/count" + q, null, RequestType.GET);
}

export const getProofApi = function (id) {
    return baseApi(baseUrl + "/" + id, null, RequestType.GET);
}

export const verifyProofApi = function (obj) {
    return baseApi(manageUrl + "/verify", JSON.stringify(obj), RequestType.PUT);
}

export const trashProofApi = function (id) {
    return baseApi(baseUrl + "/trash/" + id, null, RequestType.PUT);
}

/**
 * 参数处理
 */
const paramHandle = function (rid, startDate, endDate, verify, orderType, page, pageSize) {
    let q = "";

    if (rid != null) {
        q = q + "&rid=" + rid;
    }
    if (startDate != null && startDate.length > 0) {
        q = q + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        q = q + "&endDate=" + endDate;
    }
    if (verify != null && verify !== -2) {
        q = q + "&verify=" + verify;
    }
    if (orderType != null && orderType.length > 0) {
        q = q + "&orderType=" + orderType;
    }
    if (page != null) {
        q = q + "&page=" + page;
    }
    if (pageSize != null) {
        q = q + "&pageSize=" + pageSize;
    }
    if (q.length > 0) {
        q = "?" + q.substr(1);
    }
    return q;

}