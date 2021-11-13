import appNav from '../cmps/app-nav.js'
export default {
    template: `
        <header class="app-header">
            <img src="assets/img/logo.PNG">
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