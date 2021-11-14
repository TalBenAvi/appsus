
import { utilService } from "../../../services/util-service.js";

export default {
    props: ['mail'],
    template: `
      <section class="mail-preview-expended" >
            <div class="email-header">
                <div>
                  From: <{{mail.from}}>
                </div>
                <div>
                  Sent at: {{this.sendAt}}
                </div>
            </div>

             <article>
                 {{mail.body}}
             </article>
        </section>

    `,
    data(){
      return{
        sendAt:''
      }
      
    },
    created(){
      const time = utilService.formatDate(this.mail.sentAt);
      // console.log('time',typeof time);
      this.sendAt = time
      this.mail.sendAt = time
      // console.log(('this.mail',this.mail));
      this.isExportNoteClicked = false;
    }
}