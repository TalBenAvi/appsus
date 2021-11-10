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
                <note-list :notes="notesToShow"
                v-if="pinnedNotes"
                /> 
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
        eventBus.$on('toggleIsDone', this.toggleIsDone)
        eventBus.$on('deleteNote', this.deleteNote)
        eventBus.$on('searchInKeep', this.setSearch)
        eventBus.$on('onSaveNote', this.saveNote)
        eventBus.$on('pinNote', this.pinNote)
        eventBus.$on('onUpdateColor', this.saveNote)

    },
    destroyed() {
        eventBus.$off('toggleIsDone', this.toggleIsDone)
        eventBus.$off('deleteNote', this.deleteNote)
        eventBus.$off('searchInKeep', this.setSearch)

    },
    components: {
        noteList,
        noteAdd,
        // sideBar
    },
}