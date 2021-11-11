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
        <side-bar @filterd="setMails" @click="composeClick"></side-bar>
        <mail-list :mails="mails" ></mail-list>
        <mail-compose  v-if="isComposeClick" ></mail-compose>
    </main>
    `,
    data() {
        return {
            mails: null,
            categories: [{
                    text: 'all',
                    icon: 'fas fa-mail-bulk'
                },
                {
                    text: 'inbox',
                    icon: 'fas fa-inbox'
                },
                {
                    text: 'sent',
                    icon: 'fas fa-paper-plane'
                },
                {
                    text: 'starred',
                    icon: 'fas fa-star'
                },
                {
                    text: 'archived',
                    icon: 'fas fa-archive'
                },
                {
                    text: 'drafts',
                    icon: 'fas fa-pencil-ruler'
                },
                {
                    text: 'trash',
                    icon: 'fas fa-trash-alt'
                }
            ],
            isComposeClick:false,
            status:'inbox',
        }
    },
    created() {
        eventBus.$on('reloadMails', this.loadMails)
        // eventBus.$on('saveAsDraft', this.saveDraft)
        // eventBus.$on('removeMail', this.removeMail)
        // eventBus.$on('searchInMail', this.onSearch)
        this.loadMails()
        
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
                   if(this.status){
                    this.mails = mails.filter(mail => mail.status === this.status)
                   } 
                   console.log(this.mails);
                })
        },
        composeClick(){
            console.log('clicked');
            this.isComposeClick=! this.isComposeClick;
        },
        setMails(status){
            console.log(status);
            this.status = status;
            this.loadMails();
            // const mails = this.mails.filter(mail => mail.status === this.status);
            // this.mails = mails;
        },

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