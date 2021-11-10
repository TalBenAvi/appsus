export default {
    props: ['mail'],
    template: `
    
    <article class="mail-preview" v-bind:class="[mail.isRead ? 'read' : '']">
      <section class="small-prev-container">

        
        <button class="star-btn">
            <i :class="starred"></i>
        </button>


        <span class="mail-info">
            <span class="mail-to" v-if="isSentMail">{{mail.to}}</span>
            <span class="mail-from" v-else>{{mail.sender}}</span>
            <span class="mail-subject">{{mail.subject}}</span>
         </span>

         <div class="mail-body">
            {{mail.body}} 
          </div>
      </section>
    </article>
    `,
    // methods: {

    // },
    computed: {
        starred() {
            console.log(this.mail);
            return (!this.mail.isStarred) ? 'far fa-star' : 'fas fa-star'
        },
        isSentMail() {
            return this.mail.categories.includes('sent mails')
        },
        isRead(mail) {
            console.log('maill', mail);
            return ''
        }
    }
}

// <!-- <h1>{{mail}}</h1> -->
// <!-- <p>{{mail}}</p> -->
// {active: mail.isRead , 'read': ''}"
// v-bind:class="{read: mail.isRead , 'read': ''}