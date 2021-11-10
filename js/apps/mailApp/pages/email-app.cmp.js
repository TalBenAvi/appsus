import sideBar from '../cmps/side-bar.cmp.js';


export default {
    template: `
    <main class="email-app">
        <h1>email</h1>
        <side-bar></side-bar>
    </main>
    `,
    components: {
        sideBar,
    }
}
