export default {
    template: `
        <header class="app-header">
            <!-- <h1>AppSus</h1> -->
            <img src="assets/img/logo.PNG">
            </div>
            <nav>
                <!-- <i class="menu-icon fas fa-th fa-lg" ></i> -->
                <img className="btn-apps" src="assets/svg/apps.svg">
                <router-link to="/" active-class="active-link" exact>Home</router-link> |
                <router-link to="/books" active-class="active-link" exact>Books</router-link> |
                <router-link to="/email" active-class="active-link" >Email</router-link> |
                <router-link to="/notes" active-class="active-link" >Notes</router-link> |
                <router-link to="/about" active-class="active-link" >About</router-link>
            </nav>
        </header>
    `,
}