const api = {}

api.domain = process.env.REACT_APP_API_URL

api.postRequest = (url, param, headers, successCallback, failCallback) => {
    fetch({
        method: 'POST',
        url: url,
        data: JSON.stringify(param),
        headers: headers
    }).then(res => {
        console.log(res)
        if (res.error == null) failCallback(res.result)
        else successCallback(res.result)
    }).catch(err => {
        console.log(err)
    })
}

api.getRequest = (url, param, headers, successCallback, failCallback) => {
    const data = api.mergeParam(param)
    fetch({
        method: 'GET',
        url: url + '?' + data,
        headers: headers
    }).then(res => {
        console.log(res)
        if (res.error == null) failCallback(res.result)
        else successCallback(res.result)
    }).catch(err => {
        console.log(err)
    })
}

api.mergeParam = (param) => {
    let str = []
    for (let key in param) {
        str.push(key + '=' + param[key])
    }
    return str.join('&')
}
export default api