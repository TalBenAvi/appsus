export default {
    props: ['book'],
    template: `
        <div class="book-preview">
            <p>Title: {{book.title}}</p>
            <img :src="book.thumbnail">
            <p>Price: {{book.listPrice.amount}}{{booksCurrency}}</p>
        </div>
    `,
    data() {
        return {

        }
    },
    computed: {
        booksCurrency() {
            const { currencyCode } = this.book.listPrice
            if (currencyCode === 'EUR') return '€'
            else if (currencyCode === 'ILS') return '₪'
            else return '$'
        }
    }
}