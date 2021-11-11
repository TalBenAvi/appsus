// import emailApp from "../pages/email-app.cmp.js"
// var st = 'alkl';
// st.charAt(0).toLocaleUpperCase(0)
export default {
    props: ['categories'],
    template: `
    <aside class="email-side-bar">
        <button @click="composeClick" class="mail-compose-btn flex justify-center align-center">
        <img :key="'img'" src="assets/img/plus.png" class="inline">
        </button>

        <!-- <section class="side-bar email-menu flex" >
            <a @click="filterMails('')" >All</a>
            <a @click="filterMails('inbox')" >Inbox</a>
            <a @click="filterMails('sent')" >Sent</a>
            <a @click="filterMails('archive')" >Archive</a>
            <a @click="filterMails('drafts')" >Drafts</a>
            <a @click="filterMails('trash')" >Trash</a>
        </section> -->
        <section class="side-bar email-menu flex" v-for="category in categories">
            <a class="category.text"
             @click="filterMails(category.text) "

            >{{category.text}}</a>
        </section>
    </aside>
    `,
    data() {
        return {
            isActive: false,
            isComposeClick:false,
        }
    },
    created(){
        this.categories.forEach((category) => {
            category.text = category.text.charAt(0).toUpperCase() + category.text.slice(1);
        })
        
    },
    methods: {

        categoryToShow(category) {
            console.log(category);
            return category.text.split(':')[0]
        },
        composeClick(){
            console.log('click');
            this.$emit('click')
        },
        filterMails(filterBy){
            filterBy = filterBy.toLowerCase();
            this.$emit('filterd',filterBy)
        }


    },
    mounted(){

    },
    // computed:{

    // },
    // components: {
    //     emailApp
    // }
}

/* <section class="email-menu flex">
<a :class="{active: isActive}" @click="isActive = !isActive">All</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Inbox</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Sent</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Archive</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Drafts</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Trash</a>
</section> */


/* <transition 
enter-active-class="animate__animated animate__backInLeft"
leave-active-class="animate__animated animate__backOutLeft">
<span class="capitalize" > {{categoryToShow(category)}}</span>
</transition>  */


// <a @click="filterMails('')" >All</a>
// <a @click="filterMails('inbox')" >Inbox</a>
// <a @click="filterMails('sent')" >Sent</a>
// <a @click="filterMails('archive')" >Archive</a>
// <a @click="filterMails('drafts')" >Drafts</a>
// <a @click="filterMails('trash')" >Trash</a>