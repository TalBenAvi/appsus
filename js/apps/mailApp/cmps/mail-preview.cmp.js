import { utilService } from "../../../services/util-service.js";
import mailSummery from "./mail-summery.cmp.js";
export default {
    props: ['mail'],
    template: `
    <div class="email">
    <article class="mail-preview" 
       v-bind:class="[mail.isRead ? 'read' : '']"
       @click="showMail">
      <section class="small-prev-container">
        <button @click.stop="changeStar" class="star-btn">
            <!-- <i :class="starred"></i> -->
            <img :src="starred" alt="">
        </button>


        <span class="mail-info">
            <span>{{mail.senderName}}</span>
            <span class="mail-subject">{{mail.subject}}</span>
        </span>
      </section>
      
     <div class="mail-data">{{mail.sentAt}}</div>
    </article>

    <mail-summery  :mail="mail" v-if="isClicked">
    </mail-summery>
    </div>
    `,
    data(){
        return {
            isClicked: false,

        }
    },
    created(){
        // console.log(' this.mail.sentAt', this.mail.sentAt);
        // this.mail.sentAt = utilService.formatDate(this.mail.sentAt)
        // console.log('this.mail.sentAt',this.mail.sentAt);
    },
    methods: {
        showMail(){
            this.isClicked = !this.isClicked
        },
        changeStar(mail){
            // const isStar = this.mail.isStarred ? true : false;
            // console.log(mail);
            // this.mail.isStarred!=this.mail.isStarred;
            this.$emit('starMail', this.mail)
        },
        onStarMail() {
            this.$emit('starMail', this.mail)
        },
    },
    computed: {
        starred() {
            // console.log(this.mail);
            // return (!this.mail.isStarred) ? 'far fa-star' : 'fas fa-star'
            const starStr = this.mail.isStarred ? 'active' : 'disabled';
            return 'assets/svg/star-' + starStr + '.svg'
        },
        isSentMail() {
            return this.mail.status.includes('sent mails')
        },
        isRead(mail) {
            console.log('maill', mail);
            return ''
        },
       
    },
    components:{
        utilService,
        mailSummery
    }
}

// <!-- <h1>{{mail}}</h1> -->
// <!-- <p>{{mail}}</p> -->
// {active: mail.isRead , 'read': ''}"
// v-bind:class="{read: mail.isRead , 'read': ''}


{/* <section class="mail-preview-expended" v-if="isClicked">
<div class="email-header">
    <div>
      From: <{{mail.sender}}@gmail.com>
    </div>
    <div>
      Sent at: {{mail.sendAt}}
    </div>
</div>

 <article>
     {{mail.body}}
 </article>
</section> */}