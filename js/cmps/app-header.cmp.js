import appNav from '../cmps/app-nav.js'
export default {
    template: `
        <header class="app-header">
            <img src="assets/img/logo.PNG">
            </div>
            <nav>
                <app-nav/>
                <!-- <router-link to="/" active-class="active-link" exact>Home</router-link> |
                <router-link to="/books" active-class="active-link" exact>Books</router-link> |
                <router-link to="/email" active-class="active-link" >Email</router-link> |
                <router-link to="/notes" active-class="active-link" >Notes</router-link> |
                <router-link to="/about" active-class="active-link" >About</router-link> -->
            </nav>
        </header>
    `,
    components: {
        appNav,
    },
}