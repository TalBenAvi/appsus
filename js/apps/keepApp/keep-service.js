// import { utilService } from '../../../services/utils-service.js'
import { storageService } from "../../services/async-storage-service.js"
const NOTES_KEY = 'notes';

export const keepService = {
    query,
    createNotes,
    createNote,
    showNotes,
    save,
    remove,
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
        "id": `${storageService.makeId}`,
        "type": "note-text",
        "isPinned": false,
        "info": {
            "title": "hello",
            "txt": "my name is tal",
            "todos": [],
            "imgUrl": "",
            "videoUrl": "",
        },
    }]
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
        return (note.info.title.toLowerCase().includes(searchStr) ||
                note.info.txt.toLowerCase().includes(searchStr) ||
                note.info.todos.some(todo => todo.txt.toLowerCase().includes(searchStr))) &&
            (note.categories.some(category => category.toLowerCase().includes(filterStr)))
    })
}
function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}