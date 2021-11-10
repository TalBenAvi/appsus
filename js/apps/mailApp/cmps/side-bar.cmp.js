


export default {
   
    template: `
    <aside class="email-side-bar">
        <button class="mail-compose-btn flex justify-center align-center">
        <img :key="'img'" src="assets/img/plus.png" class="inline">
        </button>

        <section class="email-menu flex">
            <a :class="{active: isActive}" @click="makeActive">All</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Inbox</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Sent</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Archive</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Drafts</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Trash</a>
        </section>
    </aside>
    `,
    data(){
        return {
               isActive: false,
        }
    },
    methods: {
        makeActive(event){
            // console.log(event);
            this.isActive = !this.isActive;
        }

    }
}

{/* <section class="email-menu flex">
<a :class="{active: isActive}" @click="isActive = !isActive">All</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Inbox</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Sent</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Archive</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Drafts</a>
<a class="" v-class="{active: isActive}" @click="makeActive">Trash</a>
</section> */}