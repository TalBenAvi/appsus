

export default {
    template: `
    <form class="mail-compose" >

    <div class="compose-title">
        "New Message"
        <img class="btn-close" src="assets/svg/close.svg">
    </div>

    <div class="compose-to">
        <span>To</span>
        <input type="email" name="to" >
    </div>

    <div class="compose-subject">
        <span>subject</span>
        <input type="text" name="subject">
    </div>

    <div class="compose-actions">
      <button class="compose-btn-send" type="submit">Send</button>
      <button type="button" class="compose-btn-delete">
          <img src="assets/img/trash.png">
        </button>
    </div>

    </form>
    `,

}

