import axios from 'axios'

const baseURL = 'https://thephonebook-backend.onrender.com/api/persons'

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