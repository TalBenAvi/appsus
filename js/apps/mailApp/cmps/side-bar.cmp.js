
import emailApp from "../pages/email-app.cmp.js"

export default {
   props:['categories'],
    template: `
    <aside class="email-side-bar">
        <button class="mail-compose-btn flex justify-center align-center">
        <img :key="'img'" src="assets/img/plus.png" class="inline">
        </button>

        <section class="side-bar email-menu flex" >
            <a  :class="{active: isActive}" @click="makeActive">All</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Inbox</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Sent</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Archive</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Drafts</a>
            <a :class="{active: isActive}" @click="isActive = !isActive">Trash</a>
            <!-- <span class="flex">
                <i class="fas fa-mail-bulk" style="opacity: 0.54"></i>
                <span>All</span>
            </span>
            </section> -->
            <!-- <div class="email-menu-list" v-if="categories" v-for="category in categories" >
            <span class="flex">
                <i :class="category.icon" style="opacity: 0.54"></i>
                <span>{{category.text}}</span>

             
            </span>
            </div>

            <div v-if="categories" v-for="(category,idx) in categories" :key="category.text">
            <a :class="{active: isActive}" @click="makeActive">All</a> -->

            <!-- <a href=""></a> -->
            <!-- </div> -->


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
        },
        categoryToShow(category) {
            console.log(category);
            return category.text.split(':')[0]
        },
        kkk(){
            alert('yes')
        },
        nnn(){
            alert('no')
        }
        

    },
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