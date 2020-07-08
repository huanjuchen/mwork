export function getState(val) {
    if (val) {
        return "启用";
    } else {
        return "禁用"
    }
}

export function getSubjectCategory(val) {
    if (val === 1) {
        return "资产类";
    } else if (val === 2) {
        return "负债类";
    } else if (val === 3) {
        return "共同类";
    } else if (val === 4) {
        return "所有者权益类";
    } else if (val === 5) {
        return "成本类";
    } else if (val === 6) {
        return "损益类-收入";
    }else if (val===7) {
        return "损益类-费用";
    }
}