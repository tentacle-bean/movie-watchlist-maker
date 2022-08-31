import {movieSection, getMoviesInfo, renderMovies} from "./util.js"


document.getElementById("movie-searchbar").addEventListener("submit", async (event) => {
    event.preventDefault()
    
    const title = document.getElementById("movie-searchbar-input").value.toLowerCase()
    event.target.reset()
    
    const response = await fetch(`http://www.omdbapi.com/?apikey=d4bd5b8a&s=${title}&type=movie`)
    const data = await response.json()
    console.log(data)

    if(data.Response === "True"){
        const moviesInfo = await getMoviesInfo(data.Search.map(movie => movie.imdbID))
        renderMovies(moviesInfo, true)
    }
    else{
        renderFailMessage()
    }
})


function renderFailMessage(){
    movieSection.innerHTML = `
        <div class="message">
            <h3>Unable to find what you’re looking for. Please try another search.</h3>
        </div>
    `
}