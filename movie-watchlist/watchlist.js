const myWatchlist = document.getElementById("watchlist-container")
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []



function renderWatchlist () {
     if(watchlist.length > 0) {
        const detailPromises = watchlist.map(movie =>
            fetch(`https://www.omdbapi.com/?apikey=ef15950a&i=${movie.id}`)
            .then(res => res.json())
        )

                Promise.all(detailPromises).then(fullMovies => {
                    let htmlString = ""
                    for (const movie of fullMovies) {

                    htmlString += `<div class="movie-container">
                                        <img class="movie-img" 
                                            src="${movie.Poster === "N/A" ? "../images/no-poster.svg" : movie.Poster}" 
                                            alt="${movie.Title} poster"
                                            onerror="this.onerror=null; this.src='../images/no-poster.svg'"/>
                                        <div class="flex-info">
                                            <div class="title-container">
                                                <h3 class="movie-title">${movie.Title}</h3>
                                                <p class="movie-rating"><i class="fa-solid fa-star"></i> ${movie.imdbRating}</p>
                                            </div>
                                            <div class="movie-details">
                                                <p>${movie.Runtime}</p>
                                                <p>${movie.Genre}</p>
                                                <button class="remove-btn" data-id="${movie.imdbID}" data-title="${movie.Title}"><i class="fa-solid fa-circle-minus"></i> Remove</button>
                                            </div>
                                            <div class="movie-synopsis">
                                                <p>${movie.Plot}</p>
                                            </div>
                                        </div>
                                    </div>`
                                    

                }
                myWatchlist.classList.remove("empty")
                myWatchlist.innerHTML = htmlString
                })
            } else {
                myWatchlist.classList.add("empty")
                myWatchlist.innerHTML = `<p>Your watchlist is looking a little empty...</p>
                                         <a href="index.html">
                                            <i class="fa-solid fa-circle-plus"></i> 
                                            <p>Lets add some movies!</p>
                                        </a>`
        
            }
        }

document.body.addEventListener("click", e => {
        const btn = e.target.closest(".remove-btn")
        if(btn) {
            const storageID = btn.dataset.id
            if (watchlist.some(item => item.id === storageID)) {
                watchlist = watchlist.filter(item =>!(item.id ===storageID))
                localStorage.setItem("watchlist", JSON.stringify(watchlist))
            }
        }
        renderWatchlist()
    })


document.getElementById("theme-select").addEventListener("change", changeTheme)

function changeTheme(event){ 
    document.body.setAttribute("data-theme", event.target.value)
    localStorage.setItem("movieWatchlist-theme", event.target.value)
}


function setTheme () {
    const theme = localStorage.getItem("movieWatchlist-theme") || "dark"
    document.body.setAttribute("data-theme", theme)
    document.getElementById("theme-select").value = theme
}
function init() {
    renderWatchlist()
    setTheme()
}

init()