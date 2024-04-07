import { fetchWrapper } from '../_helpers/fetch-wrapper';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/userCards';

export const userCardService = {
    getAll,
    getById,
    getByUserEmail,
    create,
    update,
    addLevel,
    restart,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getByUserEmail(email) {
    return fetchWrapper.get(`${baseUrl}/user/${email}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(params) {
    return fetchWrapper.put(`${baseUrl}/${params.id}`, params);
}

function addLevel(params) {
    return fetchWrapper.put(`${baseUrl}/addLevel/${params.id}`);
}

function restart(params) {
    return fetchWrapper.put(`${baseUrl}/restart/${params.id}`);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
