import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import { keepService } from '../keep-service.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: [],
    template: `
        <section 
        class="keep-app">
            <main>
                <note-add @save="saveNote"/>
                <hr>
                <note-list :notes="notesToShow" v-if="pinnedNotes"/> 
            </main>
        </section>
    `,
    data() {
        return {
            notes: [],
            searchBy: '',
            filterBy: '',
        }
    },
    methods: {
        loadNotes() {
            keepService.query()
                .then(res => {
                    this.notes = res
                })
        },
        saveNote(note) {
            keepService.save(note)
                .then(() => this.loadNotes())
        },
        setFilter(filter) {
            this.filterBy = filter
        },
        setSearch(searchStr) {
            this.searchBy = searchStr
        },
    },
    computed: {
        pinnedNotes() {
            if (!this.notes) return
            return this.notes.filter(note => note.isPinned)
        },
        restNotes() {
            if (!this.notes) return
            return this.notes.filter(note => !note.isPinned)
        },
        notesToShow() {
            return keepService.showNotes(this.notes, this.searchBy, this.filterBy)
        }
    },
    created() {
        this.notes = this.loadNotes()
        eventBus.$on('deleteNote', this.deleteNote)
        eventBus.$on('onSaveNote', this.saveNote)

    },
    destroyed() {
        eventBus.$off('deleteNote', this.deleteNote)
    },
    components: {
        noteList,
        noteAdd,
        // sideBar
    },
}