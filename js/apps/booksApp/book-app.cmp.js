import { bookService } from '../booksApp/book-service.js';
// import { eventBus } from '../../services/event-bus-service.js';
import bookList from '../booksApp/cmps/book-list.cmp.js';
import bookFilter from '../booksApp/cmps/book-filter.cmp.js';

export default {
    template: `
        <section class="book-app app-main">
            <book-filter @filtered="setFilter"/></book-filter>
            <router-link to="/book/edit">Add a new book</router-link>
            <book-list :books="booksToShow"/></book-list>
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null
        };
    },
    created() {
        bookService.query()
            .then(books => this.books = books);
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                return (book.title.toLowerCase().includes(searchStr) && book.listPrice.amount <= this.filterBy.toPrice && book.listPrice.amount >= this.filterBy.fromPrice);
            });
            return booksToShow;
        }
    },
    components: {
        bookList,
        bookFilter
    }
};