export default {
    components: {

    },
    props: ['note'],
    template: `
    <section>
        <li>
            <img :src="note.info.imgUrl">
        </li>
    </section>
    `
}