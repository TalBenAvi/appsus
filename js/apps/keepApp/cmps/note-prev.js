import txtCmp from '../cmps/prev-cmps/txt-cmp.js'
import todosCmp from '../cmps/prev-cmps/todo-cmp.js'
import imgCmp from '../cmps/prev-cmps/img-cmp.js'
import videoCmp from '../cmps/prev-cmps/vid-cmp.js'
import { eventBus } from "../../../services/event-bus-service.js"
export default {
    components: {
        txtCmp,
        todosCmp,
        imgCmp,
        videoCmp
    },
    props: ['note'],
    template: `
        <transition>
                <section 
                class="note-preview" :class="note.type" :style="{backgroundColor: bgc}"draggable="true">
                    <component :note="note" :bgc="bgc" :is="cmp" @offEditMode="offEdit"/>
                </section>

        </transition>
        `,
    data() {
        return {
            cmp: 'txtCmp',
            editMode: false,
            bgc: 'rgb(136, 255, 243)',
            isShowingColors: false
        }
    },
    methods: {

        offEdit() {
            this.editMode = false
        },
       
        setColor(color) {
            this.bgc = color
        },
       
    },
    methods: {
        deleteNote() {
            eventBus.$emit('deleteNote', this.note.id)
            const msg = {
                txt: `Note deleted`,
                type: 'success',
                action: 'remove note',
            }
            eventBus.$emit('show-msg', msg)
        },
        onEditNote() {
            this.editMode = !this.editMode
        },
        offEdit() {
            this.editMode = false
        },
        pinNote() {
            eventBus.$emit('pinNote', this.note)
        },
        shareNote() {
            const url = `/misterEmail/newMail/?note=true&type=${this.note.type}&subject=${this.note.info.title}&body=${this.setShareBody()}`
            this.$router.push(url)
        },
        setShareBody() {
            const note = this.note.info
            let str = ''

            switch (this.note.type) {
                case 'noteTxt':
                    str = `${note.txt}`
                    break

                case 'noteTodos':
                    let todosStr = ''
                    note.todos.forEach(todo => {
                        todosStr += 'O' + todo.txt + '\n'
                    })
                    str = `${todosStr}`
                    break

                case 'noteImg':
                    str = `${note.imgUrl}`
                    break

                case 'noteVideo':
                    str = `${note.videoUrl}`
                    break

                default:
                    str = `${note.txt}`
                    break
            }

            return str
        },
        showColors() {
            this.isShowingColors = true
        },
        hideColors() {
            this.isShowingColors = false
        },
        setColor(color) {
            this.bgc = color
        },
        updateFilterByColor() {
            const currColorIdx = this.note.categories.findIndex(category => category.includes('color'))
            if (currColorIdx !== -1) this.note.categories.splice(currColorIdx, 1)

            let filter = 'fun'
            switch (this.bgc) {
                case 'rgb(255, 255, 136)':
                    filter = 'fun'
                    break
                case 'rgb(255, 136, 136)':
                    filter = 'work'
                    break
                case 'rgb(170, 255, 238)':
                    filter = 'health'
                    break
                case 'rgb(136, 187, 255)':
                    filter = 'family'
                    break
                default:
                    break
            }

            this.note.categories.push(`${filter}:color`)
        }
    },
    computed: {
        onUpdateColor(ev) {
            this.bgc = ev.value
        },
        pinNoteColor() {
            if (this.note.isPinned) return 'color: #0092ff; -webkit-text-stroke: 2px black;'
        }
    },

    created() {
        switch (this.note.type) {
            case 'note-text':
                this.cmp = 'txtCmp'
                break
            case 'note-todo':
                this.cmp = 'todosCmp'
                break
            case 'note-image':
                this.cmp = 'imgCmp'
                break
            case 'note-video':
                this.cmp = 'videoCmp'
                break
        }
        this.bgc = this.note.bgc
    },
    destroyed() {

    },
    watch: {
        bgc() {
            this.note.bgc = this.bgc
            eventBus.$emit('onUpdateColor', this.note)
            this.updateFilterByColor()
        }
    }
}
