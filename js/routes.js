import bookApp from './apps/booksApp/book-app.cmp.js';
import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import bookDetails from './apps/booksApp/cmps/book-details.cmp.js';
import  bookEdit from './apps/booksApp/cmps/book-edit.cmp.js';
import notesApp from './apps/keepApp/pages/keep-app.cmp.js'
import emailApp from './apps/mailApp/pages/email-app.cmp.js'
const aboutTeam = {
    template: `<section class="about-team">
        <h3>Tal Ben-Avi</h3>
        <p>
        Tal is the creator of missNotes and the co-creator of this whole website!
        </p>
    </section>   `
}
const aboutService = {
    template: `<section class="about-service">
        <h3>Koren Levi</h3>
        <p>
           Koren is the creator of the misterEmail and co-creator of this whole website!
        </p>
    </section>   `
}
const routes = [
    {
        path: '/home',
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
        path: '/books',
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
    {
        path: '/notes',
        component: notesApp
    },
    {
        path: '/email',
        component: emailApp
    },
];

export const router = new VueRouter({ routes });
