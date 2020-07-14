const helpers = {
    isSm: () => {
        return window.innerWidth <= 720
    },
    isMd: () => {
        return window.innerWidth <= 960
    },
    leadingZero: (n) => {
        return ('0' + n).slice(-2)
    },
    randomString: (l) => {
        if (l >= 12) l = 5
        return Math.random().toString(36).substring(l)
    },
    diffInMintues: (start, end) => {
        return Math.round(Math.abs(new Date(start) - new Date(end)) / 1000 / 60)
    },
    returnFormattedTime: () => {
        const today = new Date()
        return `${today.getFullYear()}-${helpers.leadingZero(today.getMonth() + 1)}-${helpers.leadingZero(today.getDate())} ${helpers.leadingZero(today.getHours())}:${helpers.leadingZero(today.getMinutes())}:${helpers.leadingZero(today.getSeconds())}`
    },
}
export default helpers