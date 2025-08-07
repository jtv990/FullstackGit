import axios from 'axios'

const baseURL = 'https://fullstackgit-rendertesti-5050.onrender.com'

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseURL, newPerson).then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, updatePerson) => {
    return axios.put(`${baseURL}/${id}`, updatePerson).then(response => response.data)
}

export default {
    getAll,
    create,
    deletePerson,
    update
}