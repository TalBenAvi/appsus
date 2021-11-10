import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
    <!-- <transition
    enter-active-class="animate__animated animate__fadeInDownBig"
        leave-active-class="animate__animated animate__fadeOutLeft"
        >
      
    </transition> -->
    <section class="mail-list"> 
       <mail-preview v-for="mail in mails" :mail="mail" :key="mail.id"/>
    </section>
    `,
    // data(){

    // },
    created(){
        console.log('s',this.mails);
    },
    methods: {
        saveMail(mail) {
            this.$emit('saveMail', mail)
        },
        removeMail(mail) {
            this.$emit('removeMail', mail)
        },
        archiveMail(mail) {
            this.$emit('archiveMail', mail)
        },
        starMail(mail) {
            this.$emit('starMail', mail)
        },
        ismail(mail){
            console.log('mail',mail);
            return 1;
        }

    },
    components: {
        mailPreview
    }
}

// class="clickable"
// v-for="mail in mails"
// :mail="mail" 
// :key="mail.id"


// @saveMail="saveMail"
// @removeMail="removeMail"

// @archiveMail="archiveMail"
// @starMail="starMail"