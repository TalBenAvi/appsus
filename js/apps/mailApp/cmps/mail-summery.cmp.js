


export default {
    props: ['mail'],
    template: `
      <section class="mail-preview-expended" >
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

    `
}