import appHeader from './cmps/app-header.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';
import { router } from './routes.js';
const options = {
    el: '#app',
    router,
    template: `
    <app-header></app-header>
    <!-- <router-view></router-view> -->
    <app-footer></app-footer>

    `,  components: {
        appHeader,
        appFooter,
    }
}
new Vue(options);
