import validate from 'api/validate'

const account = {
    checkUserName: (val) => {
        const len = validate.len(val, 6, 12)
        const sc = validate.hasSpecialChar(val)

        if (!len) return {error: 'length error', hint: "用戶名稱為6 - 16英文/數字"}
        if (sc) return {error: 'special character error', hint: '用戶名稱不能有英文/數字以外字元'}

        return {error: null, hint: '正確'}
    },
    checkPassword: (val) => {
        const len = validate.len(val, 8, 16)
        const sc = validate.hasSpecialChar(val)
        const hc = validate.hasCap(val)
        const hn = validate.hasNumber(val)

        if (!len) return {error: 'length error', hint: '密碼多度為8-16字元'}
        if (!sc) return {error: 'special character error', hint: '密碼最少要有一個特殊符號'}
        if (!hc) return {error: 'cap error', hint: '密碼最少要有一個大階字元'}
        if (!hn) return {error: 'num error', hint: '密碼最少要有一數字'}

        return {error: null, hint: '正確'}
    },
    checkEmail: (val) => {
        if (validate.isEmail(val)) return {error: null, hint: '正確'}
        return {error: 'email error', hint: '請輸入正確電郵地址'}
    },
    checkIsEqual: (val1, val2) => {
        return (val1 === val2)
    },
    checkIsPhoneNumber: (val) => {
        if (validate.isHongKongPhone(val)) return {error: null, hint: '正確'}
        return {error: 'mobile phone error', hint: '請輸入正確的手機號碼(8位數字)(5, 6, 9)'}
    }
}

export default account