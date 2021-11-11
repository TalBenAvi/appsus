import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import sideBar from '../cmps/side-bar.cmp.js'
import { keepService } from '../keep-service.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: [],
    template: `
        <section class="keep-app">
            <main>
            <side-bar :categories="categories" :isHovered="true" @setFilter="setFilter"/>
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
            categories: [{
                text: 'all',
                icon: 'fas fa-mail-bulk'
            },
            {
                text: 'notes',
                icon: 'far fa-sticky-note'
            },
            {
                text: 'todos',
                icon: 'fas fa-list'
            },
            {
                text: 'photos',
                icon: 'fas fa-image'
            },
            {
                text: 'videos',
                icon: 'fab fa-youtube'
            },
            {
                text: 'fun',
                icon: 'fas fa-circle general'
            },
            {
                text: 'work',
                icon: 'fas fa-circle work'
            },
            {
                text: 'family',
                icon: 'fas fa-circle family'
            },
            {
                text: 'health',
                icon: 'fas fa-circle health'
            },
        ],
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
        sideBar,
    },
}