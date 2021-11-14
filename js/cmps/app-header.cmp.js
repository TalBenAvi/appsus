import appNav from '../cmps/app-nav.js'
export default {
    template: `
        <header class="app-header">
        <router-link to="/home"><img src="assets/img/logo.PNG" ></router-link>
            </div>
            <nav>
                <app-nav/>
            </nav>
        </header>
    `,
    components: {
        appNav,
    },
}