import { fetchWrapper } from '../_helpers/fetch-wrapper';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/users';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(params) {
    return fetchWrapper.put(`${baseUrl}/${params.id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}