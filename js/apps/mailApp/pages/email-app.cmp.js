import sideBar from '../cmps/side-bar.cmp.js';


export default {
    template: `
    <main class="email-app flex">
        <!-- <h1>email</h1> -->
        <side-bar></side-bar>
    </main>
    `,
    data(){
        return {
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
    components: {
        sideBar,
    }
}
