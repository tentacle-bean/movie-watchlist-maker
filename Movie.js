class Movie{
    constructor(data){
        Object.assign(this, data)
    }


    getMovieHtml(adding){
        const {imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot} = this

        return `<div id="movie-${imdbID}" class="movie flex-row">
                <div class="movie-poster">
                    <img src=${Poster !== "N/A" ? Poster : "images/explore.png"}>
                </div>
                
                <div class="movie-info">
                    <div class="movie-title-container">
                        <h4 class="movie-title">${Title}</h4>
                        <img class="movie-star-icon" src="images/star.png">
                        <h6 class="movie-rating">${imdbRating}</h6>
                    </div>
                    
                    <div class="movie-inner-container flex-row">
                        <h5 class="movie-length">${Runtime}</h5>
                        <h5 class="movie-genres">${Genre}</h5>
                        <button id="watchlist-btn-${imdbID}" class="movie-watchlist-btn flex-row">
                            <img class="movie-watchlist-btn-icon" src=${adding ? "images/plus.png" : "images/minus.png"}>
                            ${adding ? "Watchlist" : "Remove"}
                        </button> 
                    </div>
                    
                    <p class="movie-synopsis">${Plot}</p>
                </div>
            </div>`
    }


    accessStorage(adding){
        const watchlistIDs = localStorage.getItem("watchlistIDs")

        const idSet = watchlistIDs ? new Set(watchlistIDs.split(", ")) : new Set()
        adding ? idSet.add(this.imdbID) : idSet.delete(this.imdbID)

        const idStr = Array.from(idSet).join(", ")
        localStorage.setItem("watchlistIDs", idStr)
    }


    addPlusListener(){
        document.getElementById(`watchlist-btn-${this.imdbID}`).addEventListener("click", () => {
            this.accessStorage(true)
        })
    }


    addMinusListener(){
        document.getElementById(`watchlist-btn-${this.imdbID}`).addEventListener("click", () => {
            this.accessStorage(false)

            document.getElementById(`movie-${this.imdbID}`).remove()

            const movieSection = document.getElementById("movie-section")
            if(!movieSection.childNodes.length){
                movieSection.innerHTML =   `<div class="message">
                                                <h3>Your watchlist is looking a little empty...</h3>
                                                <a class="flex-row" href="index.html"><img src="images/plus.png">Let's add some movies!</a>
                                            </div>`
            }
        })
    }
}

export default Movie