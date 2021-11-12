import { eventBus } from '../../../services/event-bus-service.js'
export default {
    template: `
    <section>
        <textarea class="note-title text-area-input" v-model="note.info.title" @change="reportVal" name="note-input" cols="50" 
        :rows="textRowsTitle"placeholder="Title"></textarea>            
        <br>
        <textarea v-for="(line, idx) in note.info.todos" class="note-txt text-area-input" v-model="note.info.todos[idx].txt" 
            @input.stop="addNewLine(idx);  updateIdx(idx); textRows(idx)" @change="reportVal" name="note-input" cols="50" 
            :rows="rowsNumbers[idx]"placeholder="O write your todo here"></textarea>            
    </section>
    `,
    data() {
        return {
            note: {
                id: null,
                type: 'note-todo',
                isPinned: false,
                categories: ['notes', 'todos','all'],
                info: {
                    title: '',
                    txt: '',
                    todos: [{ txt: '', isDone: false }],
                    imgUrl: '',
                    videoUrl: '',
                },
            },
            rowsNumbers: [1],
            currLineIdx: 0,
            bgc: 'rgb(170, 255, 238);'
        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', this.note)
        },
        addNewLine() {
            if (!this.checkIfLastLineIsEmpty()) this.note.info.todos.push({ txt: '', isDone: false })
        },
        cleanInput() {
            this.note.info.title = ''
            this.note.info.txt = ''
            this.note.info.todos = [{ txt: '', isDone: false }]
        },
        checkIfLastLineIsEmpty() {
            if (this.note.info.todos.length === 0) return true
            return (this.note.info.todos[this.note.info.todos.length - 1].txt === '')
        },
        updateIdx(idx) {
            if (idx) return
            this.currLineIdx = idx
        },
        textRows(idx) {
            if (!this.note.info.todos[idx]) return
            const text = this.note.info.todos[idx].txt

            let numberOfLineBreaks = (text.match(/\n/g) || []).length
            let characterCount = text.length + numberOfLineBreaks

            this.rowsNumbers[idx] = numberOfLineBreaks + characterCount / 40 + 1
            this.note.info.todosRows = this.rowsNumbers
            this.reportVal()
        },
    },
    computed: {
        textRowsTitle() {
            const text = this.note.info.title

            let numberOfLineBreaks = (text.match(/\n/g) || []).length
            let characterCount = text.length + numberOfLineBreaks

            return numberOfLineBreaks + characterCount / 37 + 1
        },
    },
    created() {
        eventBus.$on('cleanInput', this.cleanInput)
    }
}