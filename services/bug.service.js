import { log } from "console"
import { utilService } from "./util.service.js"
import fs from 'fs'



const PAGE_SIZE = 5
const bugs = utilService.readJsonFile('data/bugs.json')

export const bugService = {
    query,
    getById,
    remove,
    save
}
function query(queryOptions) {
    const { filterBy, sortBy } = queryOptions
    return Promise.resolve(bugs).then(bugs => {
        var copyBugs = [...bugs]

        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            copyBugs = copyBugs.filter(bug => regExp.test(bug.title))
        }

        if (filterBy.minSeverity) {
            copyBugs = copyBugs.filter(bug => bug.severity >= filterBy.minSeverity)
        }
        if (filterBy.pageIdx !== undefined && filterBy.pageIdx !== null && filterBy.pageIdx !== '') {
            const startIdx = filterBy.pageIdx * PAGE_SIZE
            copyBugs = copyBugs.slice(startIdx, startIdx + PAGE_SIZE)
        }

        if (sortBy.sortSeverity === "severity") {
            copyBugs.sort((bug1, bug2) => {
                return bug2.severity - bug1.severity
            })
        }

        if (sortBy.sortTitle === "title") {
            copyBugs.sort((bug1, bug2) =>
                (bug1.title.localeCompare(bug2.title)))
        }
        if (sortBy.sortDir === 'createdAt') {
            copyBugs.sort((bug1, bug2) => {
                return bug1.createdAt - bug2.createdAt
            })
        }
        if(filterBy.profile){
            console.log('filterBy.profile:',filterBy.profile)
            copyBugs = copyBugs.filter(bug => {
                // console.log(bug)
               return  bug.creator._id===filterBy.profile})

        }

console.log(copyBugs);
        return copyBugs
    })

}

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('Cannot find bug-' + bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    const bugIdx = bugs.findIndex(bug => bug._id === bugId)
    if (bugIdx === -1) return Promise.reject('Cannot remove bug-' + bugId)
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}




function save(bugToSave) {
    if (bugToSave._id) {
        const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs[bugIdx].severity = bugToSave.severity
    } else {
        bugToSave._id = utilService.makeId()
        bugToSave.createdAt = Date.now()
        bugs.unshift(bugToSave)
    }
    return _saveBugsToFile().then(() => bugToSave)
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}