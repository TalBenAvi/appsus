import noteTxt from './note-txt.js'
import noteImg from './note-img.js'
import noteVideo from './note-vid.js'
import noteTodos from './note-todos.js'
import { eventBus } from '../../../services/event-bus-service.js'
export default {
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo
    },
    template: `
    <section class="note-add">
        <div class="modes-btns-container">
            <h4>notes kind:</h4>
            <button title="Note" @click ="cmp='noteTxt'">
                <img src="assets/img/notepad.png">
            </button>

            <button title="Todo list" @click ="cmp='noteTodos'">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/todo-list--v2.png"/>
            </button>
            
            <button title="Image" @click ="cmp='noteImg'">
                <img src="assets/img/picture.png">
            </button>
            
            <button title="Video" @click ="cmp ='noteVideo'">
                <img src="assets/img/youtube.png">
            </button>
        </div>

        <form @submit.prevent="save">
            <component :is="cmp" @setVal="setAns"/>
            <button title="Save" class="save-btn">
                <i class="fas fa-save"></i>    
            </button>
            
        </form>
    </section>
`,
data() {
    return {
        note: {
            type: '',
            isPinned: false,
            info: {
                title: '',
                txt: '',
                todos: [],
                imgUrl: '',
                videoUrl: '',
            },
            categories: ['notes', 'general:color']
        },
        cmp: 'noteTxt'
    }
},
methods: {
    save() {
        console.log('hi');
        if (this.note.type === 'noteTodos') this.note.info.todos.pop()
        this.$emit('save', this.note)
        eventBus.$emit('cleanInput')

        const msg = {
            txt: `New note added`,
            type: 'success',
            action: 'add note',
        }
        eventBus.$emit('show-msg', msg)
    },
    setAns(val) {
        this.note = JSON.parse(JSON.stringify(val));
    },
},
watch: {
    '$route.query': {
        immediate: true,
        handler() {
            const query = this.$route.query
            if (query.mail) {
                this.note.type = 'noteTxt'
                this.note.info.title = query.subject
                this.note.info.txt = "Sender: " + query.sender + " | " + "To: " + query.to + " | " + query.body
                this.save()
                this.$router.push('/missKeep')
            }
        }
    }
},
}