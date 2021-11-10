import noteTxt from './note-txt.js'
// import noteImg from './note-img.js'
// import noteVideo from './note-vid.js'
// import noteTodos from './note-todos.js'
import { eventBus } from '../../../services/event-bus-service.js'
export default {
    components: {
        noteTxt,
        // noteTodos,
        // noteImg,
        // noteVideo
    },
    props: [],
    template: `
        <section class="note-add">
        </section>
    `,
  
}

