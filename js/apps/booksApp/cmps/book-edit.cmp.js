import { bookService } from '../book-service.js';

export default {
    template: `
        <section class="book-edit app-main">
            <h3>Add a new book to the wesite</h3>
                <input v-model.lazy="txt" type="text" placeholder="search" @keyup.enter="search">
                <div v-if="books" class="search-results">
                <ul v-for="book in books">
                    <li>{{book.volumeInfo.title}}<button @click="addSelectedBook(book.id)">+</button></li>
                </ul>
            </div>
        </section>
    `,
    data() {
        return {
            books: null,
            txt: null,
        };
    },
    methods: {
        search() {
           bookService.searchResults(this.txt)
           .then(books => {
            this.books = books;
        })
        .catch(err => console.log('Error, ', err));
        },
        addSelectedBook(id) {
            var book = this.books.find(book => book.id === id);
            var newBook = {
                id: book.id,
                title: book.volumeInfo.title,
                subtitle: book.volumeInfo.subtitle,
                authors: book.volumeInfo.authors,
                publishedDate: book.volumeInfo.publishedDate,
                description: book.volumeInfo.description,
                pageCount: book.volumeInfo.pageCount,
                categories: book.volumeInfo.categories,
                thumbnail: book.volumeInfo.imageLinks.thumbnail,
                language: book.volumeInfo.imageLinks.language,
                listPrice: {
                    currencyCode: "ILS",
                    isOnSale: false,
                    amount: 50,
                }
            }
            bookService.addGoogleBook(newBook);
        }
    },
    computed: {
    }
};