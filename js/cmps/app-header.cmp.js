export default {
    template: `
        <header class="app-header">
            <h1>AppSus</h1>
            </div>
            <nav>
                <router-link to="/" active-class="active-link" exact>Home</router-link> |
                <router-link to="/books" active-class="active-link" exact>Books</router-link> |
                <router-link to="/email" active-class="active-link" >Email</router-link> |
                <router-link to="/notes" active-class="active-link" >Notes</router-link>
            </nav>
        </header>
    `,
}