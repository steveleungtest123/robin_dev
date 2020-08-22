
const validate = {
    len: (val, min, max) => {
        return val.length >= min && val.length <= max
    },
    hasNumber: (val) => {
        return /\d/g.test(val)
    },
    hasSpecialChar: (val) => {
        return !(/^[a-zA-Z0-9]+$/gi.test(val))
    },
    startWithCap: (val) => {
        return /^[A-Z]/g.test(val)
    },
    hasCap: (val) => {
        return /[A-Z]/g.test(val)
    },
    isEmail: (val) => {
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        return re.test(val)
    },
    isHongKongPhone: (val) => {
        val = val.toString()
        if (!validate.len(val, 8, 11)) return false
        if (val.substring(0, 3) === "852") {
            val = val.slice(3)
        }
        const f = val[0]
        const firstChar = ['5', '6', '9']
        return firstChar.includes(f)
    }
}

export default validate