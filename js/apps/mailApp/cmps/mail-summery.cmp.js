


export default {
    props: ['mail'],
    template: `
      <section class="mail-preview-expended" >
            <div class="email-header">
                <div>
                  From: <{{mail.from}}>
                </div>
                <div>
                  Sent at: {{mail.sentAt}}
                </div>
            </div>

             <article>
                 {{mail.body}}
             </article>
        </section>

    `
}