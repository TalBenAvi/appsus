export default {
    props: ['categories', 'mainCounter', 'mainCounterIdx', 'isHovered'],
    template: `
      <aside @mouseover="toggleHover(true)"   @mouseleave="toggleHover(false)" class="keep-side-bar">  
       <span v-if="categories" v-for="(category,idx) in categories" @click="filterBy(category)">
         <span class="side-bar-category">            
         <i :class="category.icon" class="side-bar-icons"> </i>
         <transition enter-active-class="animate__animated animate__backInLeft"
          leave-active-class="animate__animated animate__backOutLeft">
           <span class="capitalize" v-if="hover"> {{categoryToShow(category)}}</span>
         </transition>
        </span>
       </span>
      </aside>
    `,
    data() {
        return {
            hover: false
        }
    },
    methods: {
        filterBy(category) {
            this.$emit('setFilter', category.text)
        },
        toggleHover(hovering) {
            if (!this.isHovered) {
                this.hover = true
                return
            }
            this.hover = hovering
        },
        categoryToShow(category) {
            return category.text.split(':')[0]
        }
    },
    created() {
        this.toggleHover()
    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
            }
        }
    },
}