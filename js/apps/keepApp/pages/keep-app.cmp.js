// import { eventBus } from "../services/event-bus.js"
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
export default {

    template: `
         <section class="keep-app">
             <main>
            </main>
         </section>
     `,
    components: {
        noteList,
        noteAdd,
        // sideBar
    },

}