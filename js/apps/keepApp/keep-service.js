import { storageService } from "../../services/async-storage-service.js"
const NOTES_KEY = 'notes';

export const keepService = {
    query,
    createNotes,
    createNote,
    showNotes,
    post,
    postMany,
}
function query() {
    return storageService.query(NOTES_KEY)
        .then(res => {
            if (res.length) {
                return res
            } else {
                return postMany(createNotes())
                    .then(res => {
                        return res
                    })
            }
        })
}
function createNotes() {
    const notes = [{
        "id": `${storageService.makeId()}`,
        "type": "note-text",
        "isPinned": false,
        "info": {
            "title": "hello",
            "txt": "my name is tal",
            "todos": [],
            "imgUrl": "",
            "videoUrl": "",
        },
        "categories": [
            "videos",
            "media",
            "general:color"
        ],
        "bgc": "#ffff88"
    },
    {
    "id": `${storageService.makeId()}`,
        "type": "note-text",
        "isPinned": false,
        "info": {
            "title": "kobi",
            "txt": "we miss kobi",
            "todos": [],
            "imgUrl": "",
            "videoUrl": "",
        },
        "categories": [
            "videos",
            "media",
            "general:color"
        ],
        "bgc": "#ffff88"
    },
    {
    "id": `${storageService.makeId()}`,
        "type": "note-text",
        "isPinned": false,
        "info": {
            "title": "kobi",
            "txt": "we miss kobi",
            "todos": [],
            "imgUrl": "",
            "videoUrl": "",
        },
        "categories": [
            "videos",
            "media",
            "general:color"
        ],
        "bgc": "#ffff88"
    },
    {
        "id": `${storageService.makeId()}`,
            "type": "note-text",
            "isPinned": false,
            "info": {
                "title": "kobi",
                "txt": "we miss kobi",
                "todos": [],
                "imgUrl": "",
                "videoUrl": "",
            },
            "categories": [
                "videos",
                "media",
                "general:color"
            ],
            "bgc": "#ffff88"
        },
]
    return notes;
}
function createNote(type, isPinned, info) {
    return {
        type,
        isPinned,
        info
    }
}
function showNotes(notes, searchStr, filterStr) {
    searchStr = searchStr.toLowerCase()
    filterStr = filterStr.toLowerCase()
    if (filterStr === 'all') return notes
    return notes.filter(note => {
     return (note.info.title.toLowerCase().includes(searchStr) ||note.info.txt.toLowerCase().includes(searchStr)) 
    })
}
function post(note) {
    return storageService.post(NOTES_KEY, note)
}

function postMany(mails) {
    return storageService.postMany(NOTES_KEY, mails)
}
