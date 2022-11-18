
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

    const artists = JSON.parse(content);
    const genres = JSON.parse(content2);
    const songs = JSON.parse(content3);

    console.log(songs);

    const allSongsTable = document.querySelector(".allSongsTable");
    for (let s of songs) {

        const tableRow = document.createElement("tr");
        const title = document.createElement("td");
        title.classList.add("clickTitle");
        title.textContent = s.title;
        tableRow.appendChild(title);

        const artist = document.createElement("td");
        artist.textContent = s.artist.name;
        tableRow.appendChild(artist);

        const year = document.createElement("td");
        year.textContent = s.year;
        tableRow.appendChild(year);

        const genre = document.createElement("td");
        genre.textContent = s.genre.name;
        tableRow.appendChild(genre);

        const popularity = document.createElement("td");
        popularity.textContent = s.details.popularity;
        tableRow.appendChild(popularity);

        allSongsTable.appendChild(tableRow);
    }

    const clickTitle = document.querySelector(".clickTitle").addEventListener("click", function () {
        console.log("clicked");

    });

    const clickRadio = document.querySelector("#titleRadioButton").addEventListener("click", function () {

    });
});
