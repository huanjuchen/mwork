import {baseApi} from "./MwBaseApi";
import RequestType from "../enum/RequestType";

const baseURL = "/accountBook";

export const getBankAccountApi = function (startDate, endDate) {
    let q = paramHandle(null, startDate, endDate, null);
    return baseApi(baseURL + "/bank" + q, null, RequestType.GET);
}

export const getCashAccountApi = function (startDate, endDate) {
    let q = paramHandle(null, startDate, endDate, null);
    return baseApi(baseURL + "/cash" + q, null, RequestType.GET);
}

export const getSubAccountApi = function (subjectId, startDate, endDate) {
    let q = paramHandle(subjectId, startDate, endDate, null);
    return baseApi(baseURL + "/sub" + q, null, RequestType.GET);
}

export const getLedgerAccountApi = function (subjectId, startDate, endDate) {
    let q = paramHandle(subjectId, startDate, endDate, null);
    return baseApi(baseURL + "/ledger" + q, null, RequestType.GET);
}


const paramHandle = function (subjectId, startDate, endDate, page) {
    let q = "";
    if (subjectId != null) {
        q = q + "&subjectId=" + subjectId;
    }
    if (startDate != null && startDate.length > 0) {
        q = q + "&startDate=" + startDate;
    }
    if (endDate != null && endDate.length > 0) {
        q = q + "&endDate=" + endDate;
    }
    if (page != null) {
        q = q + "&page=" + page;
    }

    if (q.length > 0) {
        q = "?" + q.substr(1);
    }
    return q;
}