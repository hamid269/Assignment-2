
document.addEventListener("DOMContentLoaded", function () {
    /* url of song api --- https versions hopefully a little later this semester */
    const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';
    /* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */

    const jsonData = localStorage.getItem("songs");
    if (!jsonData) {
        fetch(api)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                else {
                    return alert("Could not fetch API");
                }
            }).then(data => {
                const jsonData = JSON.stringify(data);
                localStorage.setItem("songs", jsonData);
            });
    }
    else {
        const artists = JSON.parse(content);
        const genres = JSON.parse(content2);
        const songs = JSON.parse(jsonData);
        //initially sort the songs by title as per instructions.
        const sortByTitle = songs.sort((a, b) => a.title < b.title ? -1 : 1);
        //display the songs when page is opened
        displaySongs(sortByTitle);
        //invoke genre list
        genreSelectList(genres);
        //invoke select list
        artistSelectList(artists);
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
        //year sorted from newest to oldest
        const yearRadioButton = document.querySelector("#yearRadioButton").addEventListener("click", function () {
            const sortByYear = songs.sort((a, b) => a.year > b.year ? -1 : 1);
            displaySongs(sortByYear);
        });

        const genreRadioButton = document.querySelector("#genreRadioButton").addEventListener("click", function () {
            const sortByGenre = songs.sort((a, b) => a.genre.name < b.genre.name ? -1 : 1);
            displaySongs(sortByGenre);
        });
        //popularity sorted from highest to lowest
        const popRadioButton = document.querySelector("#popRadioButton").addEventListener("click", function () {
            const sortByPop = songs.sort((a, b) => a.details.popularity > b.details.popularity ? -1 : 1);
            displaySongs(sortByPop);
        });
        //end of click events for the sort buttons on the main table.
      
    }
    /*
     * function name: artistSelectList
     * parameters: artists json data
     * DROPDOWN SELECT LIST FOR ARTISTS
     * this function recieves artist json data, builds option elements for each artist,
     * and appends the option to the select list with the id artistSelect in the index.html page
     * */

    function artistSelectList(artists) {
        const artistSelect = document.querySelector("#artistSelect");
        for (let a of artists) {
            const artistOption = document.createElement("option");
            artistOption.value = a.id;
            artistOption.textContent = a.name;
            artistSelect.appendChild(artistOption);
        }
    }
    /*
     * function name: genreSelectList
     * parameters: genre json data
     * DROPDOWN SELECT LIST FOR GENRES
     * this function recieves genre json data, builds option elements for each genre,
     * and appends the option to the select list with the id genreSelect in the index.html page
     * */
    function genreSelectList(genres) {
        const genreSelect = document.querySelector("#genreSelect");
        for (let g of genres) {
            const genreOption = document.createElement("option");
            genreOption.value = g.id;
            genreOption.textContent = g.name;
            genreSelect.appendChild(genreOption);
        }
    }
    
 
  
  

  /*
    //attempt to search songs with title, artist, and genre
    document.querySelector("#submit").addEventListener("click", function (e) {
        let searchList = [];
        if (e.target && e.target.nodeName == 'SUBMIT') { 
            if (e.target.id == "title") {
                 searchList = songs.filter(s => String(songs.title).includes(e.value));
 
            }
            else if (e.target.id == "artistSelect") {
                searchList= songs.filter(s => songs.artist.name === e.value);
               
            }
            else if (e.target.id == "genreSelect") {
                searchList = songs.filter(s => songs.genre.name === e.value);
               
            }
        }
        
        displaySongs(searchList);
    });
   */

    //function name: displaySongs. 
    //Parameters: a song object. sorts are done on the songs data then passed in to the function.
    //This function creates a table and its elements and displays
    //the passed in song object, and displays it in a table in the form title, artist, year, genre, popularity. 
    function displaySongs(sortedSongs) {
        
        const tableBody = document.querySelector(".allSongsBody");
        tableBody.innerHTML = ""; 

        for (let s of sortedSongs) {
           
            let tableRow = document.createElement("tr");
           
            let title = document.createElement("td");
            let a = document.createElement("a");
            a.setAttribute("data-songID", s.id);
            a.classList.add("no-underline");
            a.classList.add("clickTitle");
            a.textContent = s.title;
            a.style.color = "#7289da";
            a.setAttribute("href", "");
            title.appendChild(a);
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
            /*
             * USE THIS IF THE POPULARITY PROGRESS BARS BREAK
            let popularity = document.createElement("td");
            popularity.textContent = s.details.popularity;
            tableRow.appendChild(popularity);
            tableBody.appendChild(tableRow);
            */
            let popularity = document.createElement("td");
            let div1 = document.createElement("div");
            div1.className = "progress";
            let div = document.createElement("div");
            div.classList.add("progress", "progress-bar", "progress-bar-striped", "active");
            div.ariaRoleDescription = "progressbar";
            div.ariaValueMax = 100;
            div.ariaValuemin = 0;
            div.ariaValueNow = s.details.popularity;
            div.style = "width:" + s.details.popularity + "%";
            popularity.appendChild(div);
            tableRow.appendChild(popularity)

            //<button type="button" class="btn btn-primary">
           // Favorites
               // </button >
            let favorite = document.createElement("td");
            let button = document.createElement("button");
            favorite.appendChild(button);
            button.classList.add("btn", "btn-dark");
            let addFav = document.createElement("img");
            addFav.setAttribute("src", "icons/plus-lg.svg");
            button.appendChild(addFav);
            tableRow.appendChild(favorite);
            tableBody.appendChild(tableRow);

        }
    };

    //click event listener for when a user clicks on a song title.
    document.querySelector('.clickTitle').addEventListener("click", function (e) {
        if (e.target.nodeName == 'A' && e.target.nodeName == 'TD') {
            const single = songs.find(s => s.id == e.target.dataset.songID);
            alert("songclicked");
            e.preventDefault();
            e.stopPropagation();
            populateSongView(single);
        }
    });

    /*function name: populateSongView
     * This function populates the song view of a single song when it is clicked from the list
     * of displayed songs
     * 
    */
    function populateSongView(single) {
        let clickedSongTitle = e.target.getAttribute('');
        const findSong = songs.find(s => s.id == e.target.dataset.songId);
    }

});
