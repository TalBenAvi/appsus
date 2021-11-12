export default {
    template: `
        <div class="book-filter">
            <label>Search:</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search">
            <label>cost:</label>
            <span>Min:</span><input v-model="filterBy.fromPrice" type="range" min="0" max="500"><span>{{filterBy.fromPrice}}</span>
            <span>Max:</span> <input v-model="filterBy.toPrice" type="range" min="0" max="500"><span>{{filterBy.toPrice}}</span>
            <button @click="filter">Filter</button>
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice: 500
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered',JSON.parse(JSON.stringify(this.filterBy )));
        }
    }
}