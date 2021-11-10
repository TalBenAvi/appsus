export default {
    template: `
        <header class="app-header">
            <h1>Books</h1>
            </div>
            <nav>
                <router-link to="/" active-class="active-link" exact>Books</router-link> |
                <router-link to="/book" active-class="active-link" >Email</router-link> |
                <router-link to="/about" active-class="active-link" >Note</router-link>
            </nav>
        </header>
    `,
}