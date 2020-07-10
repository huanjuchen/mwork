export function debitCredit(val) {
    if (val === 0) {
        return "平";
    } else if (val === -1) {
        return "借";
    } else if (val === 1) {
        return "贷";
    }
    return null;
}