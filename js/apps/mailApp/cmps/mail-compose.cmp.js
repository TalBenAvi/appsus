
import { mailService } from "../services/mail-services.js"
import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util-service.js"
import { eventBus } from '../../../services/event-bus-service.js'
export default {
    template: `
    <form class="mail-compose" >

    <div class="compose-title flex">
        New Message
        <img @click="closeCompose" class="close-btn" src="assets/svg/close.svg">
    </div>

    <div class="compose-to flex">
        <span>To</span>
        <input v-model="mail.to" type="email" name="to" >
    </div>

    <div class="compose-subject flex">
        <span>subject</span>
        <input v-model="mail.subject" type="text" name="subject">
    </div>
    
    <textarea v-model="mail.body" name="body" rows="18"></textarea>

    <div class="compose-actions flex">
      <button @click="sendMail" class="compose-btn-send" type="submit">Send</button>
      <button @click="closeCompose" type="button" class="compose-btn-delete">
          <img src="assets/img/trash.png">
        </button>
    </div>

    </form>
    `,
    data(){
        return {
            mail: {
                id: storageService.makeId(),
                senderName:'Me',
                status: ['sent'],
                subject: '',
                body: '',
                isRead: true,
                isStarred: false,
                sentAt: 0,
                from: 'muki@appsus.com',
                to: '',
            }

        }
    },
    methods: {
        closeCompose(){
            this.$emit('close')
        },
        sendMail(){
            this.mail.sentAt = utilService.formatDate(Date.now());
            
            console.log(this.mail);
            
            setTimeout(() => {
                console.log(this.mail);
                mailService.post(this.mail)
                    .then(() => {
                        eventBus.$emit('reloadMails')
                    })
            }, 2000)
        },
       
    },
    components:{
        mailService,
        storageService,
        utilService,
        eventBus
    }

}

