import { bookService } from '../book-service.js';
import longText from '../cmps/long-text.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';
import bookReview from '../cmps/book-review.cmp.js'
export default {
    template: `
        <section v-if="book" class="book-details app-main">
            <router-link to="/book" class="btn-location">X</router-link>
            <h3>Book Details:</h3>
            <p>Title : {{book.title}}</p>
            <p>Subtitle : {{book.subtitle}}</p>
            <img :src="book.thumbnail">
            <p>Authors : {{bookAuthors}}</p>
            <p :class="colorDisplay">Price : {{book.listPrice.amount}}{{bookCurrency}}</p>
            <p>Published Date : {{book.publishedDate}}{{publishedDate}}</p>
            <long-text :txt="book.description"/></long-text>
            <p>Page Count : {{book.pageCount}}{{pageCounter}}</p>
            <p>Categories : {{bookCategories}}</p>
            <p>Language : {{book.language}}</p>
            <span class="sale">{{saleForDisplay}}</span>
            <!-- <router-link :to="'/book/'+previousBookId">🠸 previous book</router-link> -->
            <router-link :to="'/book/'+nextBookId">Next book 🠺</router-link>
        <fieldset class="reviews">
            <legend>Book Reviews:</legend>
            <div class="review-display"  v-for="(review, idx) in book.reviews" :key="review.id">
                <a class="close-btn" @click="removeReview(idx)">x</a>
                <p><span>Review: </span>{{review.txt}}</p>
                <p><span>Published date:</span> {{review.date}}</p>
                <p><span>Full Name: </span>{{review.fullName}}</p>
                <p><span>Rate: </span>{{review.rate}}</p>
            </div>
        </fieldset >
        <button @click="reviewToggle">{{textOnBtn}}</button>
                <book-review v-if="isReviewOpen" @review="saveReview"></book-review>
        </section>

    `,
    data() {
        return {
            book: null,
            isReviewOpen: false,
        }
    },
    methods: {
        reviewToggle() {
            this.isReviewOpen = !this.isReviewOpen;
        },
        saveReview(review) {
            bookService.addReview(review,this.book.id)
                .then(book => this.book = book)
                .then(() => {
                    const msg = {
                        txt: `The review on book: ${this.book.id}  was Added!`,
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },

        removeReview(idx) {
            this.book.reviews.splice(idx, 1)
            bookService.save(this.book)
                .then(() => {
                    const msg = {
                        txt: `Review was remove`,
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },

    },
    computed: {
        saleForDisplay() {
            if (this.book.listPrice.isOnSale) return 'SALE'
        },
        bookCurrency() {
            const { currencyCode } = this.book.listPrice;
            if (currencyCode === 'EUR') return '€'
            else if (currencyCode === 'ILS') return '₪'
            else return '$'
        },
        bookAuthors() {
            const { authors } = this.book;
            return authors.toString();
        },
        bookCategories() {
            const { categories } = this.book;
            return categories.toString();

        },
        pageCounter() {
            const { pageCount } = this.book;
            if (pageCount > 500) return ' Long reading'
            if (pageCount > 200) return ' Decent Reading'
            else if (pageCount < 100) return ' Light Reading'
        },
        publishedDate() {
            const { publishedDate } = this.book;
            var CurrYear = new Date(Date.now()).getFullYear();
            if (CurrYear - publishedDate > 10) return ' Veteran Book'
            else if (CurrYear - publishedDate < 1) return ' New!'
        },
        saleDisplay() {
            if (this.book.listPrice.isOnSale) return 'ON SALE!'
        },
        colorDisplay() {
            if (this.book.listPrice.amount > 150) return 'high';
            else if (this.book.listPrice.amount < 20) return 'low';
            return;
        },
        textOnBtn() {
            if (this.isReviewOpen) return 'Close';
            return 'Review';
        }
    },
    components: {
        longText,
        bookReview,
        eventBus
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params;
                bookService.getById(bookId)
                    .then(book => this.book = book);
                bookService.getNextBookId(bookId)
                    .then(bookId => this.nextBookId = bookId);
            },
            // handler() {
            //     const { bookId } = this.$route.params;
            //     bookService.getById(bookId)
            //         .then(book => this.book = book);
            //     bookService.getPrevBookId(bookId)
            //         .then(bookId => this.previousBookId = bookId);
            // },
            immediate: true
        }
    }
}