const cookies = {
    set: (key, value, sec) => {
        const expires = sec ? sec * 1000 : 1000 * 60 * 60 * 24 * 7 //7days
        const date = new Date()
        date.setTime(date.getTime() + expires)
        document.cookie = `${key}=${value};expires=${date.toGMTString()}`
    },
    get: (key) => {
        const val = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return val ? val[2] : null
    },
    remove: (key) => {
        document.cookie = `${key}='';expires=${new Date()}`
    }
}

export default cookies