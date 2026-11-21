
const searchBtn = document.getElementById("search-btn")
const titleList = document.getElementById("search-results-container")
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []


document.body.addEventListener("click", e => {
        const btn = e.target.closest(".add-btn")
        if(btn) {
            const storageID = btn.dataset.id
            const storageTitle = btn.dataset.title
            if (!watchlist.some(item => item.id === storageID)) {
                watchlist.push({id: storageID, title: storageTitle})
                localStorage.setItem("watchlist", JSON.stringify(watchlist))
            }
            btn.textContent = "Added!"
            btn.disabled = true
        }
    })


searchBtn.addEventListener("click", function() {
    const movieTitle = encodeURIComponent(document.getElementById("title-search").value)
    
    fetch(`https://www.omdbapi.com/?apikey=ef15950a&s=${movieTitle}`)
        .then(res => res.json())
        .then(data => {
            if(data.Response === "True") {
                const detailPromises = data.Search.map(movie =>
                    fetch(`https://www.omdbapi.com/?apikey=ef15950a&i=${movie.imdbID}`)
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
                                                <button class="add-btn" data-id="${movie.imdbID}" data-title="${movie.Title}"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                                            </div>
                                            <div class="movie-synopsis">
                                                <p>${movie.Plot}</p>
                                            </div>
                                        </div>
                                    </div>`
                                    

                }
                titleList.classList.remove("empty")
                titleList.innerHTML = htmlString
                })
            } else {
                titleList.classList.add("empty")
                titleList.innerHTML = `<p>Unable to find what you're looking for. Please try another search.</p>`
           
            }
        })




            

})




document.getElementById("theme-select").addEventListener("change", changeTheme)

function changeTheme(event){ 
    document.body.setAttribute("data-theme", event.target.value)
}