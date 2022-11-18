
document.addEventListener("DOMContentLoaded", function () {



    /* url of song api --- https versions hopefully a little later this semester */
    const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';



    /* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
    const genres = JSON.parse(content2);
    const artists = JSON.parse(content);
    const songs = JSON.parse(content3);

    console.log(genres);

    console.log(artists);

    console.log(songs);
    const table = document.querySelector("#songTable");
    for (let s of songs) {
    }

});

    