export default {
    props: ['note'],
    template: `
        <div class="li-video">
             <iframe width="200" height="250" :src="'https://www.youtube.com/embed/'+note.info.videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </div> 
    `
}
