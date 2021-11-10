

export default {
    props: ['notes'],
    template: `
    <section class="note-list-container">
        <h3 v-if="pinnedNotes.length">Pinned</h3>   
        <div class="note-list" >
            <note-preview v-for="note in pinnedNotes" v-if="pinnedNotes.length" :key="note.id" :note="note"/>
        </div>
        <hr>
        <h3 v-if="otherNotes.length && pinnedNotes.length">Notes</h3>   
        <div class="note-list" >
            <note-preview v-for="note in otherNotes" v-if="otherNotes" :key="note.id" :note="note"/>
        </div>
    </section>
    `,
}
