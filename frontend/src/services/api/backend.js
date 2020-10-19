const protocol = process.env.REACT_APP_DEVICE_PROTOCOL
const host = process.env.REACT_APP_DEVICE_HOST
const port = process.env.REACT_APP_DEVICE_PORT
const path = process.env.REACT_APP_DEVICE_PATH

export function postConnect(data) {
    const fetchUrl = protocol + "://" + host + ":" + port + path + "/connect"
    return fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export function postSendMessage(data) {
    const fetchUrl = protocol + "://" + host + ":" + port + path + "/message"
    return fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export function postDisconnect() {
    const fetchUrl = protocol + "://" + host + ":" + port + path + "/disconnect"
    return fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify({})
    })
}