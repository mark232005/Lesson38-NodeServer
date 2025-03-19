import { utilService } from "./util.service.js"
import fs from 'fs'




const bugs = utilService.readJsonFile('data/bugs.json')

export const bugService = {
    query,
    getById,
    remove,
    save
}
function query() {
    return Promise.resolve(bugs)
}

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('Cannot find a bug-' + bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    const bugIdx = bugs.findIndex(bug => bug._id = bugId)
    if (bugIdx == -1) return Promise.reject('Cannot remove bug-' + bugId)
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}


function save(bugToSave) {
    if (bugToSave._id) {
        const bugIdx = bugs.findIndex(bug => bug._id = bugId)
        bugs[bugIdx] = bugToSave
    } else {
        bugToSave._id = utilService.makeId
        bugs.unshift(bugToSave)
    }
    return _saveBugsToFile.then(() => bugToSave)
}

function _saveBugsToFile() {
    return new Promise((reject, resolve) => {
        const data = JSON.stringify(cars, null, 4)
        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })

    })
}