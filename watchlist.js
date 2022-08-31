import {movieSection, getMoviesInfo, renderMovies} from "./util.js"


prepareWatchlist()

async function prepareWatchlist(){
    console.log("prepareWatchlist????????")

    const storage = localStorage.getItem("watchlistIDs")
    //console.log(storage)

    const ids = storage ? storage.split(", ") : false
    //console.log(typeof(ids))
    
    if(ids){
        const moviesInfo = await getMoviesInfo(ids)
        renderMovies(moviesInfo, false)
    }
    else{
        renderEmptyMessage()
    }
    
}


function renderEmptyMessage(){
    movieSection.innerHTML = `
        <div class="message">
            <h3>Your watchlist is looking a little empty...</h3>
            <a class="flex-row" href="index.html"><img src="images/plus.png">Let's add some movies!</a>
        </div>
    `
}

