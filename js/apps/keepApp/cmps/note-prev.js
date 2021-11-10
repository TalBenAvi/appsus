import txtCmp from '../cmps/prev-cmps/txt-cmp.js'
// import todosCmp from '../cmps/prev-cmps/todo-cmp.js'
// import imgCmp from '../cmps/prev-cmps/img-cmp.js'
// import videoCmp from '../cmps/prev-cmps/vid-cmp.js'
import { eventBus } from "../../../services/event-bus-service.js"
export default {
    components: {
        txtCmp,
        // todosCmp,
        // imgCmp,
        // videoCmp
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
}
