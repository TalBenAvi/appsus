import appNavItem from './app-nav-item.cmp.js'
export default {
template: `
    <nav class="app-nav">
         <i class="menu-icon fas fa-th fa-lg"@click.stop="onToggleMenu" ></i>
       <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__fadeOutRight">
        <section class="menu-container"@click="onToggleMenu" v-if="isNavOpen">
        <app-nav-item v-for="item in items" :item="item"/>
        </section>
       </transition>      
    </nav>
    `,
    data() {
        return {
            isNavOpen: false,
            items: [{
                icon: 'fas fa-envelope fa-2x',
                title: 'Email',
                routerUrl: '/email',
                color: 'black'
            },
            {
                icon: 'fas fa-sticky-note fa-2x',
                title: 'Keep',
                routerUrl: '/notes',
                color: 'black'
            },
            {
                icon: 'fas fa-info fa-2x',
                title: 'Info',
                routerUrl: '/about',
                color: 'black'
            },
            {
                icon: 'fas fa-book fa-2x',
                title: 'Books',
                routerUrl: '/books',
                color: 'black'
            },
            ],

        }
    },
    methods: {
        onToggleMenu() {
            this.isNavOpen = !this.isNavOpen
        }
    },
    components: {
        appNavItem,
    },
    created() {
        document.addEventListener('click', () => { this.isNavOpen = false })
    },
}