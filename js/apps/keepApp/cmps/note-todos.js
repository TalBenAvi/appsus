import { eventBus } from '../../../services/event-bus-service.js'
export default {
    template: `
    <section>
            <textarea class="note-title text-area-input"
                    v-model="note.info.title" 
                    @change="reportVal"
                    name="note-input" 
                    cols="50" 
                    :rows="textRowsTitle"
                    placeholder="Title"
            ></textarea>            
            <br>
            <textarea v-for="(line, idx) in note.info.todos" 
                    class="note-txt text-area-input"
                    v-model="note.info.todos[idx].txt" 
                    @input.stop="addNewLine(idx);  updateIdx(idx); textRows(idx)"
                    @change="reportVal"
                    name="note-input" 
                    cols="50" 
                    :rows="rowsNumbers[idx]"
                    placeholder="O write your todo here"
            ></textarea>            
    </section>

    `,
    data() {
        return {
            note: {
                id: null,
                type: 'noteTodos',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                    todos: [{ txt: '', isDone: false }],
                    imgUrl: '',
                    videoUrl: '',
                },
                categories: ['notes', 'todos'],
            },
            currLineIdx: 0,
            rowsNumbers: [1]
        }
    },

}