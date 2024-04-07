export const fetchWrapper = {
    get,
    getFile,
    post,
    put,
    putImage,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(url, requestOptions).then(handleResponse).catch(err => console.log(err));
}

function getFile(url) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(url, requestOptions).then(handleFileResponse).catch(err => console.log(err));
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse).catch(err => console.log(err));
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'multipart/form-data' },
        body: JSON.stringify(body),
        credential: 'include'
    };
    return fetch(url, requestOptions).then(handleResponse).catch(err => console.log(err));
}

function putImage(url, formData) {
    const requestOptions = {
        method: "PUT",
        body: formData,
        headers: {
            "Accept": "multipart/form-data",
        },
        credentials: "include",
    };
    return fetch(url, requestOptions).then(handleResponse).catch(err => console.log(err));
}


// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(url, requestOptions).then(handleResponse).catch(err => console.log(err));
}

// helper functions

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function handleFileResponse(response) {
    return response.blob().then(blob => {
        const data = blob && blob;

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}