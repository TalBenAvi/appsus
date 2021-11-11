import notePrev from './note-prev.js'

export default {
    props: ['notes'],
    template: `
    <section class="note-list-container"> 
        <hr>  
        <h3 v-if="pinnedNotes.length">Pinned important</h3>   
        <div class="note-list" >
            <note-prev v-for="note in pinnedNotes"v-if="pinnedNotes.length":key="note.id":note="note"/>
        </div>
        <h3 v-if="otherNotes.length && pinnedNotes.length">The rest of the notes</h3>
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
