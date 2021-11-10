import sideBar from '../cmps/side-bar.cmp.js';


export default {
    template: `
    <main class="email-app flex">
        <!-- <h1>email</h1> -->
        <side-bar></side-bar>
    </main>
    `,
    components: {
        sideBar,
    }
}
