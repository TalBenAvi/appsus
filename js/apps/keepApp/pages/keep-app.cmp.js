// import { eventBus } from "../services/event-bus.js"
import { keepService } from '../keep-service.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
export default {

    template: `
         <section class="keep-app">
             <main>
             <note-list :notes="notesToShow" v-if="pinnedNotes"/> 
            </main>
         </section>
     `,
      computed: {
        notesToShow() {
            return keepService.showNotes(this.notes, this.searchBy, this.filterBy)
        }
    },
    components: {
        noteList,
        noteAdd,
        // sideBar
    },

}