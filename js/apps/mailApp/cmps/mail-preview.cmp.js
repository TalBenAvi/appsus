export default {
    props: ['mail'],
    template: `
    <section onload="ell()" class = "flex">


    <!-- <h1>{{mail}}</h1> -->
    <!-- <button>
        <i :class="starred"></i>
    </button> -->


    </section>
    `,
    methods: {
        ell() {
            console.log('mail', this.mail);
        }
    },
    computed: {
        starred() {
            console.log(this.mail);
            return (!this.mail.isStarred) ? 'far fa-star' : 'fas fa-star'
        },
    }
}