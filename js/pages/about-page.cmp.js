import {
    eventBus
} from '../services/event-bus-service.js';

export default {
    template: `
        <section class="about-page app-main">
            <h1 ref="header">About our team</h1>
            <nav>
                <router-link to="/team"><span class="font-big">Tal Ben-Avi</span></router-link> 
                <span class="font-big">|</span>
                <router-link to="/service"><span class="font-big">Koren Levi</span></router-link>
            </nav>
            <router-view></router-view>
        </section>
    `,
    methods: {

    },
    // created() {
    //     console.log('Created');
    // },
    // mounted(){
    //     console.log('Mounted');
    //     console.log(this.$refs.header);
    // }
};