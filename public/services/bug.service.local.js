import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'bugs'
const BASE_URL = '/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
}

function query(filterBy) {
 console.log('filterBy',filterBy);
 console.log('BASE_URL',BASE_URL,{params:filterBy});
    return axios.get(BASE_URL,{params:filterBy})
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId)
        .then(res => res.data)

}

function save(bug) {
    const url = BASE_URL
    if (bug._id) {
        return axios.put(url+bug._id, bug)
        .then(res => res.data)
        .catch(err => {
            console.log('err:', err)
        })


    } else {
        return axios.post(url, bug)
            .then(res => res.data)
            .catch(err => {
                console.log('err:', err)
            })

    }
}
function getDefaultFilter() {
    return { txt: '', minSeverity: 0, pageIdx:undefined,sortTitle:null,sortSeverity:null,sortDir:null,profile:''}
}
