import sideBar from '../cmps/side-bar.cmp.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailPreview from '../cmps/mail-preview.cmp.js'
import {
    eventBus
} from "../../../services/event-bus-service.js"
import {
    mailService
} from "../services/mail-services.js"

export default {

    template: `
    <main class="email-app flex">
        <!-- <h1>email</h1> -->
        <side-bar></side-bar>
        <mail-list :mails="mails"></mail-list>
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
                    console.log('res', this.mails);
                })
        },
    },
    components: {
        sideBar,
        mailList,
        mailPreview,
        mailService
    }
}