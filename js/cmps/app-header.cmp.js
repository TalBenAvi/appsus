export default {
    template: `
        <header class="app-header">
            <h1>AppSus</h1>
            </div>
            <nav>
                <router-link to="/" active-class="active-link" exact>Home</router-link> |
                <router-link to="/book" active-class="active-link" >Books</router-link> |
                <router-link to="/about" active-class="active-link" >About</router-link>
            </nav>
        </header>
    `,
}