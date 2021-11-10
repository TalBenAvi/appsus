export default {
    template: `
        <section class="note-add">
            <div class="modes-btns-container">

                <button title="Note" @click = "cmp = 'noteTxt'">
                    <i class="far fa-sticky-note"></i>
                </button>

                <button title="Todo" @click = "cmp = 'noteTodos'">
                    <i class="fas fa-list"></i>
                </button>
                
                <button title="Photo" @click = "cmp = 'noteImg'">
                    <i class="fas fa-image"></i>
                </button>
                
                <button title="Video" @click = "cmp = 'noteVideo'">
                    <i class="fab fa-youtube"></i>
                </button>
            </div>

            <form @submit.prevent="save">

                <component :is="cmp" @setVal="setAns"/></component>

                <button title="Save" class="save-btn">
                    <i class="fas fa-save"></i>    
                </button>
                
            </form>
        </section>
    `,
}
