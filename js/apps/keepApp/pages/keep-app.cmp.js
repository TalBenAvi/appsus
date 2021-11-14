import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import sideBar from '../cmps/side-bar.cmp.js'
import { keepService } from '../keep-service.js'
import { eventBus } from '../../../services/event-bus-service.js'
export default {
    props: [],
    template: `
        <section class="keep-app">
            <side-bar class="keep-side-bar" :categories="categories" :isHovered="true" @setFilter="setFilter"/>
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
            // {
            //     text: 'fun',
            //     icon: 'fas fa-circle fun'
            // },
            // {
            //     text: 'work',
            //     icon: 'fas fa-circle work'
            // },
            // {
            //     text: 'family',
            //     icon: 'fas fa-circle family'
            // },
            // {
            //     text: 'health',
            //     icon: 'fas fa-circle health'
            // },
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
            console.log(filter);
            this.filterBy = filter
        },
        toggleIsDone({ noteId, todoIdx }) {
            keepService.toggleIsDone({ noteId, todoIdx })
                .then(res => this.notes = res)
        },
        deleteNote(noteId) {
            keepService.remove(noteId)
                .then(() => this.loadNotes())
        },
        pinNote(note) {
            keepService.togglePinNode(note)
                .then((res) => this.notes = res)
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
            if (!this.filterBy) return this.notes;
            const filterStr = this.filterBy;
            console.log(filterStr);
            const notesToShow = this.notes.filter(note => {
                console.log(note.categories);
                return (note.categories.includes(filterStr)||note.categories.includes(`${filterStr}:color`));
            });
            return notesToShow;
        }
    },
    created() {
        this.notes = this.loadNotes()
        eventBus.$on('toggleIsDone', this.toggleIsDone)
        eventBus.$on('deleteNote', this.deleteNote)
        eventBus.$on('onSaveNote', this.saveNote)
        eventBus.$on('pinNote', this.pinNote)
        eventBus.$on('onUpdateColor', this.saveNote)
    },
    destroyed() {
        eventBus.$off('toggleIsDone', this.toggleIsDone)
        eventBus.$off('deleteNote', this.deleteNote)
    },
    components: {
        noteList,
        noteAdd,
        sideBar,
    },
}