import sideBar from '../cmps/side-bar.cmp.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailPreview from '../cmps/mail-preview.cmp.js'
import { eventBus } from "../../../services/event-bus-service.js"
import {
    mailService
} from "../services/mail-services.js"
import mailCompose from '../cmps/mail-compose.cmp.js'

export default {

    template: `
    <main class="email-app flex">
        <!-- <h1>email</h1> -->
        <side-bar @filterd="setMails" @click="composeClick" :categories="categories"></side-bar>
        <mail-list :mails="mails" @starMail="starMail"></mail-list>
        <mail-compose @close="composeClick" v-if="isComposeClick" ></mail-compose>
    </main>
    `,
    data() {
        return {
            mails: null,
            categories: [{
                    text: 'all',
                    icon: 'fas fa-mail-bulk',
                    isActive:false
                },
                {
                    text: 'inbox',
                    icon: 'fas fa-inbox'
                },
                {
                    text: 'sent',
                    icon: 'fas fa-paper-plane',
                    isActive:false
                },
                {
                    text: 'starred',
                    icon: 'fas fa-star',
                    isActive:false
                },
                {
                    text: 'archived',
                    icon: 'fas fa-archive',
                    isActive:false
                },
                {
                    text: 'draft',
                    icon: 'fas fa-pencil-ruler',
                    isActive:false
                },
                {
                    text: 'trash',
                    icon: 'fas fa-trash-alt',
                    isActive:false
                }
            ],
            isComposeClick:false,
            status:'inbox',
        }
    },

    methods: {
        loadMails() {
            mailService.query()
                .then((res) => {
                    this.mails = res
                    return this.mails;
                })
                .then((mails) => {
                    console.log(this.mails);
                    if(this.status==='all'){
                        this.mails = mails;
                        return;
                    }
                    // console.log(mails);
                   if(this.status){
                    this.mails = mails.filter(mail => {
                        return mail.status.includes(this.status) &&
                            (this.status === 'archived' || !mail.status.includes('archived'))
                    })} 
                   console.log(this.mails);
                })
        },
        fixMails(){
            // this.mail.sentAt = utilService.formatDate(this.mail.sentAt)
        },
        composeClick(){
            // console.log('clicked');
            this.isComposeClick=! this.isComposeClick;
        },
        setMails(status){
            if(this.status === status) return;
            console.log(status);
            this.status = status;
            
            this.loadMails();
            // const mails = this.mails.filter(mail => mail.status === this.status);
            // this.mails = mails;
        },
        starMail(mail) {
            mailService.toggleStar(mail.id)
                .then((res) => {
                    this.mails = res
                })
                .then(this.loadMails())
        },
        removeMail() {
           this.loadMails();
        },

    },
    created() {
        eventBus.$on('reloadMails', this.loadMails)
        // eventBus.$on('saveAsDraft', this.saveDraft)
        eventBus.$on('removeMail', this.removeMail)
        // eventBus.$on('searchInMail', this.onSearch)
        this.loadMails()
        
    },
    computed:{
        // composeClick(){
        //     console.log('clicked');
        //     this.isComposeClick=! this.isComposeClick;
           
        // }
        // setmails(){
        //     loadMails();
        //     const mails = this.mails.filter(mail => mail.status === this.status);
        //     this.mails = mails;
        // },
    },
    
    components: {
        sideBar,
        mailList,
        mailPreview,
        mailService,
        mailCompose

    }
}