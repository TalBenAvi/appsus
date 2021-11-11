import { utilService } from "../../../services/util-service.js";
export default {
    props: ['mail'],
    template: `
    
    <article class="mail-preview" 
    v-bind:class="[mail.isRead ? 'read' : '']"
    
    @click="showMail"
    >
      <section class="small-prev-container">

        
        <button class="star-btn">
            <i :class="starred"></i>
        </button>


        <span class="mail-info">
            <span class="mail-to" v-if="isSentMail">{{mail.to}}</span>
            <span class="mail-from" v-else>{{mail.sender}}</span>
            <span class="mail-subject">{{mail.subject}}</span>
         </span>

         <!-- <div class="mail-body">
            {{mail.body}} 
          </div> -->
          <section class="email-preview-expended" v-if="isClicked">
            <div class="email-header">
             <div>
             From: <{{mail.sender}}@gmail.com>
             </div>
             <div>
             Sent at: {{mail.sendAt}}
              </div>
            </div>

             <article>
                 {{mail.body}}
             </article>
          </section>
      </section>
    </article>
    `,
    data(){
        return {
            isClicked: false,

        }
    },
    methods: {
        showMail(){
            this.isClicked = !this.isClicked
        }

    },
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
        },
        getDate(){

        }
    },
    components:{
        utilService
    }
}

// <!-- <h1>{{mail}}</h1> -->
// <!-- <p>{{mail}}</p> -->
// {active: mail.isRead , 'read': ''}"
// v-bind:class="{read: mail.isRead , 'read': ''}