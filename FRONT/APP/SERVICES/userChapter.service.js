import { fetchWrapper } from '../_helpers/fetch-wrapper';

const baseUrl = process.env.EXPO_PUBLIC_API_URL + '/userChapters';

export const userChapterService = {
    getAll,
    getById,
    getByUserEmail,
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

function getByUserEmail(email) {
    return fetchWrapper.get(`${baseUrl}/user/${email}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
