export function getState(val) {
    if (val) {
        return "启用";
    } else {
        return "禁用"
    }
}

export function getRole(val){
    if (val === 1) {
        return "超级管理员";
    } else if (val === 2) {
        return "主管会计";
    } else {
        return "会计";
    }
}