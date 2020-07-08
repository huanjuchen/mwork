export const getVerifyStatus = function (val) {
    if (val === 0) {
        return "待审核";
    } else if (val === 1) {
        return "审核通过";
    } else if (val === -1) {
        return "审核未通过";
    } else {
        return null;
    }
}