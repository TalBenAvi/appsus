import notePrev from './note-prev.js'

export default {
    props: ['notes'],
    template: `
    <section class="note-list-container"> 
        <hr>  
        <div class="note-list" >
            <note-prev v-for="note in otherNotes" v-if="otherNotes" :key="note.id" :note="note"/>
        </div>
    </section>
    `,
    computed: {
        pinnedNotes() {
            return this.notes.filter(note => note.isPinned)
        },
        otherNotes() {
            return this.notes.filter(note => !note.isPinned)
        }
    },
    components: {
        notePrev
    },
}
