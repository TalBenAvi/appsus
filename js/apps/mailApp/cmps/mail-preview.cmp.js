import {
    utilService
} from "../../../services/util-service.js";
import mailSummery from "./mail-summery.cmp.js";
import {
    keepService
} from "../../keepApp/keep-service.js";
export default {
    props: ['mail'],
    template: `
    <div class="email"
    @mouseover="onHover(true)"
    @mouseleave="onHover(false)"
     >
    <article class="mail-preview" 
       v-bind:class="[mail.isRead ? 'read' : '']"
      >
      <section  @click="showMail" class="small-prev-container">
        <button @click.stop="changeStar" class="star-btn">
            <!-- <i :class="starred"></i> -->
            <img :src="starred" alt="">
        </button>

        <span class="mail-info">
            <span>{{mail.senderName}}</span>
            <span class="mail-subject">{{mail.subject}}</span>
        </span>
      </section>

     <div :class="{hovered: isHovered}" v-if=!isHover class="mail-data">{{mail.sentAt}}</div>

     <div v-else class="preview-btns-container flex" >
      <img src="assets/svg/reply.svg" title="Reply">
      <img src="assets/img/trash.png" title="Remove">
      <img src="assets/img/unread.png" title="Mark as unread">
      <img @click="sendNote(mail)" src="assets/svg/note.svg" title="Export as note">
      <img src="assets/svg/fullscreen.svg" title="Full screen">
      </div>
    </article>

    <mail-summery  :mail="mail" v-if="isClicked">
    </mail-summery>
    
    </div>
    `,
    data() {
        return {
            isClicked: false,
            isStarClicked: false,
            starId: '',
            isHover: false,
        }
    },
    created() {
        // console.log(' this.mail.sentAt', this.mail.sentAt);
        // this.mail.sentAt = utilService.formatDate(this.mail.sentAt)
        // console.log('this.mail.sentAt',this.mail.sentAt);
    },
    methods: {
        showMail() {
            this.isClicked = !this.isClicked
        },
        changeStar() {
            // const isStar = this.mail.isStarred ? true : false;
            // console.log(mail);
            // this.mail.isStarred!=this.mail.isStarred;
            this.isStarClicked = !this.isStarClicked;
            this.starId = this.mail.id;
            console.log('this', this.mail);
            // setTimeout(() => {
            //     console.log('koren');
            //     this.$emit('starMail', this.mail)
            // }, 500)
            this.$emit('starMail', this.mail)
        },
        onStarMail() {
            this.$emit('starMail', this.mail)
        },
        onHover(hover) {
            this.isHover = hover
        },
        sendNote(mailInfo) {
            console.log('mailInfo', mailInfo);
            const info = {
                info: {
                    title: "Saved Mail",
                    txt: mailInfo.body,
                    todos: [],
                    imgUrl: "",
                    videoUrl: "",
                }
            }
            const mail = keepService.createNoteKoren('note-text', false, info)
            console.log('mail',mail);
            // keepService.post(mail) TODO: Tal
                

        },
    },
    computed: {
        starred() {
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
        isHovered() {

            if (this.isHoverd) {
                console.log('hoverd', this.isHovered);
            }
            return this.isHoverd
        }

    },
    components: {
        utilService,
        mailSummery,
        keepService
    }
}

// <!-- <h1>{{mail}}</h1> -->
// <!-- <p>{{mail}}</p> -->
// {active: mail.isRead , 'read': ''}"
// v-bind:class="{read: mail.isRead , 'read': ''}


{
    /* <section class="mail-preview-expended" v-if="isClicked">
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
    </section> */
}


{
    /* <div :class="{hovered: isHovered}" v-if=!isHover class="mail-data">{{mail.sentAt}}</div>

    <div v-else class="preview-btns-container flex" >
     <img src="assets/svg/reply.svg" title="Reply">
     <img src="assets/img/trash.png" title="Remove">
     <img src="assets/img/unread.png" title="Mark as unread">
     <img @click="sendNote(mail)" src="assets/svg/note.svg" title="Export as note">
     <img src="assets/svg/fullscreen.svg" title="Full screen">
     </div>
    </article> */
}