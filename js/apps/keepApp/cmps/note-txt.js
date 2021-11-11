import { eventBus } from '../../../services/event-bus-service.js'
export default {
    template: `
        <section>
          <textarea class="note-title text-area-input"v-model="note.info.title" @change="reportVal" name="note-input" cols="50" :rows="textRowsTitle" placeholder="Title"></textarea>            
          <textarea class="text-area-input" v-model="note.info.txt" @change="reportVal" name="note-input" cols="50" :rows="textRows"placeholder="write your note here"></textarea>            
        </section>
    `,
    data() {
        return {
            note: {
                id: null,
                type: 'note-text',
                isPinned: false,
                info: {
                    title: '',
                    txt: '',
                    todos: [],
                    imgUrl: '',
                    videoUrl: ''
                },
                categories: ['notes'],
                bgc: 'rgb(170, 255, 238);'
            }
        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', this.note)
        },
        cleanInput() {
            this.note.info.title = ''
            this.note.info.txt = ''
        },
    },
    computed: {
        textRows() {
            const text = this.note.info.txt

            let numberOfLineBreaks = (text.match(/\n/g) || []).length
            let characterCount = text.length + numberOfLineBreaks

            return numberOfLineBreaks + characterCount / 50 + 2
        },
        textRowsTitle() {
            const text = this.note.info.title

            let numberOfLineBreaks = (text.match(/\n/g) || []).length
            let characterCount = text.length + numberOfLineBreaks

            return numberOfLineBreaks + characterCount / 37 + 1
        },
    },
    created() {;
        eventBus.$on('cleanInput', this.cleanInput)
    },
}
