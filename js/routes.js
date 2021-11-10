// import bookApp from './pages/book-app.cmp.js';
import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
// import bookDetails from './pages/book-details.cmp.js';
// import  bookEdit from './pages/book-edit.cmp.js';

const aboutTeam = {
    template: `<section class="about-team">
        <h3>Our Team is The Best There is</h3>
        <p>
        our team here to help you with any problem or question you have you can contact us in our costumer support or on the phone
        </p>
    </section>   `
}
const aboutService = {
    template: `<section class="about-service">
        <h3>What our Services includes</h3>
        <p>
           you can contact us and ask us to find you any book there is and we will find it no matter how long it will take!
        </p>
    </section>   `
}
const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: '/team',
                component: aboutTeam
            },
            {
                path: '/service',
                component: aboutService
            },
        ]
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId?/edit',
        component: bookEdit
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];

export const router = new VueRouter({ routes });
