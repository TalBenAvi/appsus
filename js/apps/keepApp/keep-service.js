import { storageService } from "../../services/async-storage-service.js"
const NOTES_KEY = 'notes';

export const keepService = {
    query,
    createNotes,
    createNote,
    showNotes,
    post,
    postMany,
    toggleIsDone,
    getById,
    remove,
    get,
    save,
    togglePinNode,
    createNoteKoren
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
            "all",
            "notes",
            "fun:color"
        ],
        "bgc":"rgb(255, 255, 136)"
    },
    {
    "id": `${storageService.makeId()}`,
        "type": "note-video",
        "isPinned": false,
        "info": {
            "title": "",
            "txt": "",
            "todos": [],
            "imgUrl": "",
            "videoUrl": "https://www.youtube.com/watch?v=qz0aGYrrlhU&list=RDCMUCWv7vMbMWH4-V0ZXdmDpPBA&index=1",
        },
        "categories": [
            "all",
            "videos",
            "fun:color"
        ],
        "bgc":"rgb(255, 136, 136)"
    },
    {
        "id": `${storageService.makeId()}`,
            "type": "note-image",
            "isPinned": false,
            "info": {
                "title": "",
                "txt": "",
                "todos": [],
                "imgUrl": "assets/img/memePic.jpg",
                "videoUrl": "",
            },
            "categories": [
                "all",
                "photos",
                "fun:color"
            ],
            "bgc":"rgb(255, 136, 136)"
        },
    {
        "id": `${storageService.makeId()}`,
            "type": "note-todo",
            "isPinned": false,
            "info": {
                "title": "chores",
                "txt": "",
                "todos": [{
                    "txt": "learn vue",
                    "isDone": false
                },
                {
                    "txt": "buy clothes to the winter",
                    "isDone": true
                },
                {
                    "txt": "find a job",
                    "isDone": false
                },
            ],
                "imgUrl": "",
                "videoUrl": "",
            },
            "categories": [
                "all",
                "todos",
                "fun:color"
            ],
            "bgc":"rgb(170, 255, 238)"
        },
        {
            "id": `${storageService.makeId()}`,
                "type": "note-text",
                "isPinned": false,
                "info": {
                    "title": "Hello",
                    "txt": "my name is koren",
                    "todos": [],
                    "imgUrl": "",
                    "videoUrl": "",
                },
                "categories": [
                    "all",
                    "notes",
                    "fun:color"
                ],
                "bgc":"rgb(170, 200, 255)"
            },
            {
                "id": `${storageService.makeId()}`,
                    "type": "note-image",
                    "isPinned": false,
                    "info": {
                        "title": "",
                        "txt": "",
                        "todos": [],
                        "imgUrl": "assets/img/view.jpg",
                        "videoUrl": "",
                    },
                    "categories": [
                        "all",
                        "photos",
                        "fun:color"
                    ],
                    "bgc":"rgb(170, 200, 255)"
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
function createNoteKoren(type, isPinned, info) {
    return {
        id:'',
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
function toggleIsDone({ noteId, todoIdx }) {
    return query()
        .then(res => {
            const note = res.find(note => (note.id === noteId))
            note.info.todos[todoIdx].isDone = !(note.info.todos[todoIdx].isDone)
            save(note)
            return res
        })
}
function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}
function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}
function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}
function togglePinNode(note) {
    note.isPinned = !note.isPinned
    return save(note)
        .then(() => {
            return query()
        })
}