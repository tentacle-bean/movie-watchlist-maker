import Movie from "./Movie.js"

const movieSection = document.getElementById("movie-section")


async function getMoviesInfo(ids){
    const movies = []

    for(let i = 0; i < ids.length; i++){
        const response = await fetch(`http://www.omdbapi.com/?apikey=d4bd5b8a&i=${ids[i]}&type=movie`)
        const data = await response.json()

        movies.push(data)
    }

    return movies
}


function renderMovies(moviesInfo, adding){
    const movies = moviesInfo.map((info) => new Movie(info))

    const moviesHtml = movies.map(movie => movie.getMovieHtml(adding)).join("")

    movieSection.innerHTML = moviesHtml
    
    adding ?    movies.map(movie => movie.addPlusListener())   :
                movies.map(movie => movie.addMinusListener())
    
}


export {movieSection, getMoviesInfo, renderMovies}