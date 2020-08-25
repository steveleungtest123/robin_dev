const api = {}

api.domain = process.env.REACT_APP_API_URL

api.postRequest = (url, param, headers, successCallback, failCallback) => {
    console.log(url)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(param),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        credentials: 'include'
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
        if (successCallback) successCallback(json)
    })
    .catch(err => failCallback ? failCallback(err) : null)
}

api.getRequest = (url, param, headers, successCallback, failCallback) => {
    const data = api.mergeParam(param)
    console.log(url + '?' + data)
    fetch(url + '?' + data, {
        method: 'GET',
        headers: {
            ...headers
        },
        credentials: 'include'
    })
    .then(res => res.json())
    .then(json => {
        if (successCallback) successCallback(json)
    }).catch(err => {
        if (failCallback) failCallback(err)
    })
}

api.mergeParam = (param) => {
    let str = []
    for (let key in param) {
        str.push(key + '=' + param[key])
    }
    return str.join('&')
}

api.sqlErrorMessage = (error) => {
    console.log(error)
    let errorMsg = {
        msg: "",
        key: "",
        value: ""
    }
    if (error.code === "ER_DUP_ENTRY") {
        errorMsg = {
            msg: error.message,
            key: error.message.match(/'\w+'/g)[0],
            value: error.message.match(/'\w+'/g)[1]
        }
    }
    return errorMsg
}
export default api