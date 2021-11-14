import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util-service.js"
import { eventBus } from "../../../services/event-bus-service.js"
const MAILS_KEY = 'mails'

export const mailService = {
    query,
    get,
    getByFilter,
    getBySearch,
    post,
    postDraft,
    postMany,
    remove,
    getIndex,
    createMail,
    toggleArchive,
    toggleStar,
    createSimpleMail,
    createFirstMails,
    save,
}

function query() {
    return storageService.query(MAILS_KEY)
        .then(res => {
            if (!res || !res.length) {
                return postMany(createFirstMails())
                    .then(newMails => {
                        return newMails
                    })
            }
            return res
        })
}

function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function getByFilter(mails, filterBy) {
    return mails.filter(mail => {
        return mail.categories.includes(filterBy) &&
            (filterBy === 'archived' || !mail.categories.includes('archived'))
    })
}

function getBySearch(mails, searchWord) {
    return mails.filter(mail => {
        return mail.sender.toLowerCase().includes(searchWord.toLowerCase()) ||
            mail.subject.toLowerCase().includes(searchWord.toLowerCase()) ||
            mail.to.toLowerCase().includes(searchWord.toLowerCase())
    })
}

function post(mail) {
    if (mail.to === 'You') return sendMailToMe(mail)
    return storageService.post(MAILS_KEY, mail)
}

function postDraft(mail) {
    mail.categories = ['drafts']
    return storageService.post(MAILS_KEY, mail)
}

function sendMailToMe(mail) {
    let newMail = JSON.parse(JSON.stringify(mail))
    newMail.categories = ['inbox']
    newMail.to = 'You'

    mail.isRead = true
    mail.categories = ['sent mails']
    return storageService.post(MAILS_KEY, newMail)
        .then(() => {
            return storageService.post(MAILS_KEY, mail)
        })
}

function postMany(mails) {
    return storageService.postMany(MAILS_KEY, mails)
}

function remove(mail) {
    return storageService.remove(MAILS_KEY, mail.id)
        .then(() => query()
            .then(res => {
                return res
            })
        )
}

function toggleArchive(mailId) {
    return query()
        .then(res => {
            const targetMail = res.find(mail => mail.id === mailId)
            const idx = targetMail.categories.findIndex(c => c === 'archived')

            if (idx === -1) targetMail.categories.push('archived')
            else targetMail.categories.splice(idx, 1)

            save(targetMail)

            return res
        })
}

function toggleStar(mailId) {
    return query()
        .then(res => {
            const targetMail = res.find(mail => mail.id === mailId)
            targetMail.isStarred = !targetMail.isStarred
            console.log('targetMail.categories',targetMail.isStarred);

            const idx = targetMail.status.findIndex(c => c === 'starred')

            if (idx === -1) targetMail.status.push('starred')
            else targetMail.status.splice(idx, 1)

            save(targetMail)
            console.log('res',res);
            
            return res
        })
        
}

function getIndex(mailId) {
    return query()
        .then(mails => {
            return mails.findIndex(mail => mail.id === mailId)
        })
}

function createMail(sender, subject, body, status, to = 'you', isRead = false, sentAt = Date.now()) {
    return {
        sender,
        subject,
        body,
        status: [status],
        to,
        isRead,
        sentAt,
        isStarred: false,
        from: '',
        to: '',
    }
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAILS_KEY, mail)
            .then(() => {
                return query()
                    .then(res => {
                        return res
                    })
            })
    } else {
        return storageService.post(MAILS_KEY, mail)
            .then(() => {
                return query()
                    .then(res => {
                        return res
                    })
            })
    }
}

function createSimpleMail() {
    return {
        sender: 'You',
        senderName:'Me',
        subject: 'Wassap?',
        body: storageService.makeLorem(200),
        status: ['inbox'],
        to: 'you',
        isRead: false,
        sentAt: Date.now(),
        isStarred: false,
        from: 'momo@gmail.com',
        to: 'muki@appsus.com',
    }
}

function createFirstMails() {
    const mails = [{
            id: storageService.makeId(),
            sender: 'iCloud',
            subject: 'Your iCloud storage is full?',
            body: 'Hello Sir, Your iCloud storage is full. Because you have exceeded your storage plan, your documents, contacts, and device data are no longer backing up to iCloud and your photos and videos are not uploading to iCloud Photos. iCloud Drive and iCloud-enabled apps are not updating across your devices.',
            categories: ['inbox'],
            to: 'you',
            isRead: true,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Google Cloud',
            subject: 'Your Google Cloud ',
            body: 'Hello Google Cloud Customer, We are sending this message to let you know about the following updates to the Google Cloud platform',
            categories: ['inbox'],
            to: 'you',
            isRead: true,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Yaron Biton',
            subject: 'Your Sprint grade',
            body: 'Hello guys, I am sorry to tell you that your sprint was very bad, hope to see some better things in sprint 4',
            categories: ['inbox'],
            to: 'you',
            isRead: false,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Stav Partush',
            subject: 'Team leader message',
            body: 'Hello guys, please do not forget to upload everything to dropBox (except of git), and also upload everything to GitHub pages!',
            categories: ['inbox'],
            to: 'you',
            isRead: false,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Rotem Carmon',
            subject: 'DropBox',
            body: 'Hi everyone, DO NOT forget to leave git folder out of my amazing and clean DropBox',
            categories: ['inbox', 'starred'],
            to: 'you',
            isRead: false,
            sentAt: new Date(),
            isStarred: true
        },
        {
            id: storageService.makeId(),
            sender: 'Yaron Biton',
            subject: 'Your Sprint grade',
            body: 'Hello guys, I am sorry to tell you that your sprint was very bad, hope to see some better things in sprint 4',
            categories: ['inbox'],
            to: 'you',
            isRead: false,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Stav Partush',
            subject: 'Team leader message',
            body: 'Hello guys, please do not forget to upload everything to dropBox (except of git), and also upload everything to GitHub pages!',
            categories: ['inbox', 'starred'],
            to: 'you',
            isRead: true,
            sentAt: new Date(),
            isStarred: true
        },
        {
            id: storageService.makeId(),
            sender: 'iCloud',
            subject: 'Your iCloud storage is full?',
            body: 'Hello Sir, Your iCloud storage is full. Because you have exceeded your storage plan, your documents, contacts, and device data are no longer backing up to iCloud and your photos and videos are not uploading to iCloud Photos. iCloud Drive and iCloud-enabled apps are not updating across your devices.',
            categories: ['inbox'],
            to: 'you',
            isRead: true,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Google Cloud',
            subject: 'Your iCloud storage is full?',
            body: 'Hello Google Cloud Customer, We are sending this message to let you know about the following updates to the Google Cloud platform',
            categories: ['inbox'],
            to: 'you',
            isRead: false,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Yaron Biton',
            subject: 'Your Sprint grade',
            body: 'Hello guys, I am sorry to tell you that your sprint was very bad, hope to see some better things in sprint 4',
            categories: ['inbox'],
            to: 'you',
            isRead: false,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Stav Partush',
            subject: 'Team leader message',
            body: 'Hello guys, please do not forget to upload everything to dropBox (except of git), and also upload everything to GitHub pages!',
            categories: ['inbox'],
            to: 'you',
            isRead: true,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Rotem Carmon',
            subject: 'DropBox',
            body: 'Hi everyone, DO NOT forget to leave git folder out of my amazing and clean DropBox',
            categories: ['inbox'],
            to: 'you',
            isRead: false,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Me',
            subject: 'Yassss',
            body: 'Hello my friend, how are you we goi',
            categories: ['drafts'],
            to: 'Rotem Carmon',
            isRead: false,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Rotem Carmon',
            subject: 'DropBox',
            body: 'Hi everyone, DO NOT forget to leave git folder out of my amazing and clean DropBox',
            categories: ['inbox', 'archived'],
            to: 'you',
            isRead: false,
            sentAt: new Date(),
            isStarred: false
        },
        {
            id: storageService.makeId(),
            sender: 'Me',
            subject: 'Yassss',
            body: 'Hello my friend, how ar',
            categories: ['inbox', 'archived'],
            to: 'Rotem Carmon',
            isRead: false,
            sentAt: new Date(),
            isStarred: false
        },

    ]

    const gmails = [{
        id: storageService.makeId(),
        senderName:'Momo',
        status: ['inbox'],
        subject: 'Hello My Friend',
        body: 'Hello!\nHow are you? I had a great time last night, call me if you wanna hang out again..',
        isRead: true,
        isStarred: false,
        sentAt: 1627074029000,
        from: 'momo@gmail.com',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Puki',
        status: ['inbox'],
        subject: 'It’s here. Arturia FX Collection 2',
        body: 'Arturia never disappoints. Like never.\nTheir FX Collection 2 comes at us with it’s classic blend of vintage effects\
         and modern enhancers, now with 3 new Bus FX, 4 new Modulation FX, an updated preset browser, and 200 new presets. FX Collection 2\
          puts exceptional studio-quality effects in the hands of musicians and producers of all styles and abilities.\n\
          Try for free!',
        isRead: true,
        isStarred: true,
        sentAt: 1608757209000,
        from: 'puki@m.splice.com',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Tal ben avi',
        status: ['inbox'],
        subject: 'Introducing OB-Xa V: Legendary Growl Machine',
        body: "Hello Muki,\nWe are beyond excited to announce the launch of our newest software instrument,\
         the OB-Xa V. Welcome to music history, reborn!\nOB-Xa V a recreation of Oberheim's legendary analog\
          synthesizer OB-Xa, whose dynamic sound made it into countless hits of some of the greatest artists.\n\
          The most recognizable moment of this analog synthesizer is the legendary intro in Van Halen’s hit ‘Jump’\
           and its powerful sonics appeared in many albums by iconic artists, such as Prince, The Police, or Queen.\
            Today, it’s used by the likes of Flume, Chrome Sparks, Calvin Harris, and Venetian Snares.",
        isRead: true,
        isStarred: true,
        sentAt: 1629236709000,
        from: 'hi@m.splice.com',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Google Cloud',
        status: ['inbox'],
        subject: 'Account confirmation: Your Google Cloud free trial',
        body: 'Welcome to Google Cloud.\nLearn the fundamentals with this tutorial – and see what else you can do\
         for free on Google Cloud with our Always Free tier.\n\
         Welcome to your Google Cloud free trial. Beginning today,\n\
         you have $300 USD in credit to spend on Google Cloud. With your free trial, you can:\n\
         Use your credits to evaluate the platform risk-free*\n\
         Explore a wide range of Google Cloud products and services – from Compute Engine and BigQuery to App Engine and industry-leading AI\n\
         Easily check your credit usage by visiting the Cloud Billing section of your Google Cloud Console\n\
         Get hands-on now with this quick Cloud Console Tour, highlighting how to easily navigate, organize, and manage your projects.\n\
         To start exploring on your own, just visit your Cloud Console.',
        isRead: true,
        isStarred: true,
        sentAt: 1629723909000,
        from: 'CloudPlatform-noreply@google.com',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Add',
        status: ['inbox'],
        subject: 'Massive Savings with Our Cyber Deals',
        body: 'Cyber Deals are here with 50% off!\n\
         Be ready to enjoy a massive 50% discount on Absolute Collection, Dorico, SpectraLayers,\
         Iconica, Nuendo Live and Cubasis. Just enter the coupon code at checkout or save directly\
         in the App Store or Google Play Store.\n\
        Get six of our industry-leading audio software applications for half the price! This offer is only valid until December 7, 2020.',
        isRead: true,
        isStarred: false,
        sentAt: 1630081327000,
        from: 'info@news.steinberg.net',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Udemy',
        status: ['inbox'],
        subject: 'Social Authentication Added',
        body: 'Hi Muki,\nWe take your account security seriously and wanted to update you on a change to your account.\
        A Google login was just added to your existing Udemy account.\n\
        If you are aware of your Udemy account and the additional Google login, no action is needed on your part.\n\
        If you are unaware of this action, please protect the security of your account by changing your password.\n\
        If you have any other questions or concerns, please contact Support.',
        isRead: false,
        isStarred: false,
        sentAt: 1630088589000,
        from: 'no-reply@e.udemymail.com',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Robot API',
        status: ['inbox'],
        subject: 'OpenWeatherMap API Instruction',
        body: 'Dear Customer!\n Thank you for subscribing to Free OpenWeatherMap!\n\
        - Your API key is asdadasdasdasdasdaszxvx\n\
        - Within the next couple of hours, it will be activated and ready to use\n\
        - You can later create more API keys on your account page\n\
        - Please, always use your API key in each API call',
        isRead: true,
        isStarred: false,
        sentAt: 1629915609000,
        from: 'robot@openweathermap.org',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:' ',
        status: ['inbox'],
        subject: 'Asi shared "CaSep21-Materials" with you',
        body: 'Hi Muki,\nAsi invited you to view the folder "CaSep21-Materials" on Dropbox.\n\
        Enjoy!\nThe Dropbox team.\nAsi and others will be able to see when you view files in this folder. \
        Other files shared with you through Dropbox may also show this info.Learn more in our help center.',
        isRead: false,
        isStarred: false,
        sentAt: 1629465009000,
        from: 'no-reply@dropbox.com',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Drop Box',
        status: ['inbox'],
        subject: 'Just one more step to complete your Dropbox setup',
        body: 'Hi Muki,\n Your account is almost ready! To get the most out of Dropbox, be sure to install \
        Dropbox on your computer and phone.\n\
        Any file you save to your Dropbox will automatically save to all your computers, phones and even the Dropbox website.\n\
        Dropbox also lets you easily share docs and photos, and collaborate with friends.',
        isRead: true,
        isStarred: true,
        sentAt: 1623707769000,
        from: 'no-reply@dropboxmail.com',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Udemy',
        status: ['inbox'],
        subject: 'My New Course - The Last Chance!',
        body: "Hey Everyone!\nPlease excuse the overly dramatic subject line. This is not the last chance ever to purchase my new \
        Command Line course, but it is the last chance to use the $9.99 coupon before it expires. If you missed my original announcement,\n\
         here's a bit more about the course...",
        isRead: true,
        isStarred: false,
        sentAt: 1624704969000,
        from: 'no-reply@e.udemymail.com',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Mika',
        status: ['inbox'],
        subject: 'Reminder!',
        body: 'Hey Muki!\n Just a reminder - you and Puki are invited over to dinner tomorrow!\nDont forget to BYOB\nSee ya there!!',
        isRead: true,
        isStarred: false,
        sentAt: 1614921729000,
        from: 'mika@appsus.com',
        to: 'muki@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Arela',
        status: ['inbox'],
        subject: 'YOU WON THE LOTTERY!',
        body: "Dear Muki!\nI'm happy to inform you that you won the lottery!\n\n\nApril fools!!!",
        isRead: true,
        isStarred: true,
        sentAt: 1617254529000,
        from: 'mika@appsus.com',
        to: 'muki@appsus.com',
      },
      //#endregion
      //#region SENT
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['sent'],
        subject: 'Pizza',
        body: 'Hey Mika!\nDo you wanna eat pizza tomorrow?\nCall me if you wanna hangout',
        isRead: true,
        isStarred: false,
        sentAt: 1627074009000,
        from: 'muki@appsus.com',
        to: 'mika@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['sent'],
        subject: 'Coding Academy',
        body: 'Hey,\nCan you tell me more about Coding Academy?\nI heard nice things about it.',
        isRead: true,
        isStarred: false,
        sentAt: 1630081327000,
        from: 'muki@appsus.com',
        to: 'Coding-Academy@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['draft'],
        subject: 'What is Lorem Ipsum?',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
        isRead: true,
        isStarred: false,
        sentAt: 1609478529000,
        from: 'muki@appsus.com',
        to: 'johnny@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['sent'],
        subject: 'Photos from last night',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
        isRead: true,
        isStarred: false,
        sentAt: 1620595329000,
        from: 'muki@appsus.com',
        to: 'johnny@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['sent'],
        subject: 'Lets go to the circus',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
        isRead: true,
        isStarred: false,
        sentAt: 1620495329000,
        from: 'muki@appsus.com',
        to: 'yummy@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['sent'],
        subject: 'PARTY AT MY PLACE',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
        isRead: true,
        isStarred: false,
        sentAt: 1620491329000,
        from: 'muki@appsus.com',
        to: 'idk@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['draft'],
        subject: 'Diablo',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
        isRead: true,
        isStarred: false,
        sentAt: 1623002769000,
        from: 'muki@appsus.com',
        to: 'diablo@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['sent'],
        subject: 'no subject',
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy \
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived \
        not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s \
        with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker \
        including versions of Lorem Ipsum.",
        isRead: true,
        isStarred: false,
        sentAt: 1609956369000,
        from: 'muki@appsus.com',
        to: 'tatltu@appsus.com',
      },
      //#endregion
      //#region DRAFTS
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['draft'],
        subject: 'I love you',
        body: 'Hey Mika!\nI thought about it a lot and...I love you.\nWill you marry me?',
        isRead: true,
        isStarred: false,
        sentAt: 1627074009000,
        from: 'muki@appsus.com',
        to: 'mika@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['draft'],
        subject: 'Last Night',
        body: 'Hey Mika!\nLast night was so fun.\nWill you marry me?',
        isRead: true,
        isStarred: false,
        sentAt: 1621074009000,
        from: 'muki@appsus.com',
        to: 'mika@appsus.com',
      },
      {
        id: storageService.makeId(),
        senderName:'Me',
        status: ['draft'],
        subject: 'Ice Cream',
        body: 'Hey Mika!\nDo you wanna go eat icecream sometime?.\nJust the two of us?',
        isRead: true,
        isStarred: false,
        sentAt: 1621974009000,
        from: 'muki@appsus.com',
        to: 'mika@appsus.com',
      },
      //#endregion
    ];
    // fixMails(gmails)
    return gmails
}

// function fixMails(gmails){
//     for(var i = 0; i < gmails.length; i++){
//         var mail = gmails[i];
//         if(mail.isStarred){
//             mail.status.push('starred')
//         }
//         if(typeof mail.sentAt === 'number'){
//             console.log(typeof mail);
//             mail.sentAt = utilService.formatDate(mail.sentAt)
//          }
//     }
//     console.log('gmails ser',gmails);
// }


