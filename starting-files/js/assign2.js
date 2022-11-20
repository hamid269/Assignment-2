
document.addEventListener("DOMContentLoaded", function () {



    /* url of song api --- https versions hopefully a little later this semester */
    const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';



    /* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
    const artists = JSON.parse(content);
    const genres = JSON.parse(content2);
    const songs = JSON.parse(content3);

    //const allSongsTable = document.querySelector(".allSongsTable");
    console.log(songs);
     // "const ______RadioButton" SORTS FOR TITLE, ARTIST, YEAR, GENRE, POPULARITY BEGIN HERE.
    //each of these event listeners sort the songs by the appropriate field.
    const titleRadioButton = document.querySelector("#titleRadioButton").addEventListener("click", function () {
        const sortByTitle = songs.sort((a, b) => a.title < b.title ? -1 : 1);
        displaySongs(sortByTitle);
    });

    const artistRadioButton = document.querySelector("#artistRadioButton").addEventListener("click", function () {
        const sortByArtist = songs.sort((a, b) => a.artist.name < b.artist.name ? -1 : 1);
        displaySongs(sortByArtist);
    });
    const yeartRadioButton = document.querySelector("#yearRadioButton").addEventListener("click", function () {
        const sortByYear = songs.sort((a, b) => a.year < b.year ? -1 : 1);
        displaySongs(sortByYear);
    });

    const genreRadioButton = document.querySelector("#genreRadioButton").addEventListener("click", function () {
        const sortByGenre = songs.sort((a, b) => a.genre.name < b.genre.name ? -1 : 1);
        displaySongs(sortByGenre);
    });

    const popRadioButton = document.querySelector("#popRadioButton").addEventListener("click", function () {
        const sortByPop = songs.sort((a, b) => a.details.popularity > b.details.popularity ? -1 : 1);
        displaySongs(sortByPop);
    });
    //end of click events for the sort buttons on the main table.


    displaySongs(songs);

   

    

    //attempt to search songs with title, artist, and genre

    document.querySelector("#searchForm").addEventListener("submit", function (e) {
        let searchList = [];
        if (e.target && e.target.nodeName == 'SUBMIT') { 
            if (e.target.id == "title") {
                 searchList = songs.filter(s => String(songs.title).includes(e.value));
              
            }
            else if (e.target.id == "artistSelect") {
                searchList= songs.filter(s => songs.artist.name == e.value);
               
            }
            else if (e.target.id == "genreSelect") {
                searchList = songs.filter(s => songs.genre.name == e.value);
               
            }
        }
        
        displaySongs(searchList);
    });
   
    //function name: displaySongs. This function creates a table and its elements and displays
    //the passed in song object in the form title, artist, year, genre, popularity. 
    function displaySongs(sortedSongs) {
        
        const allSongsTable = document.querySelector(".allSongsTable");
        
        const tableBody = document.createElement("tbody");
        tableBody.innerHTML = "";
        for (let s of sortedSongs) {
            
            let tableRow = document.createElement("tr");
            let title = document.createElement("td");
            title.classList.add("clickTitle");
            title.textContent = s.title;
            tableRow.appendChild(title);

            let artist = document.createElement("td");
            artist.textContent = s.artist.name;
            tableRow.appendChild(artist);

            let year = document.createElement("td");
            year.textContent = s.year;
            tableRow.appendChild(year);

            let genre = document.createElement("td");
            genre.textContent = s.genre.name;
            tableRow.appendChild(genre);

            let popularity = document.createElement("td");
            popularity.textContent = s.details.popularity;
            tableRow.appendChild(popularity);

            allSongsTable.appendChild(tableRow);        
        }

    };
    
   // console.log(genres);
    //create a dropdown list of options for genres
    const genreSelect = document.querySelector("#genreSelect");
    
    for (let g of genres) {
        const genreOption = document.createElement("option");
        genreOption.value = g.id;
        genreOption.textContent = g.name;
        genreSelect.appendChild(genreOption);
    }
   // console.log(artists);
    //create a dropdown list of options for artists
    const artistSelect = document.querySelector("#artistSelect");
    for (let a of artists) {
        const artistOption = document.createElement("option");
        artistOption.value = a.id;
        artistOption.textContent = a.name;
        artistSelect.appendChild(artistOption);
    }

    
});
