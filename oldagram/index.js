const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]


const mainEl = document.getElementById("post")
let html = ""
for (let i = 0; i < posts.length; i++) {
    html += `
        <article class="post" data-index="${i}">
            <div class="header">
                <img class="avatar" src="${posts[i].avatar}">
                <div>
                    <div>
                        <span class="name">${posts[i].name}</span>
                    </div>
                    <span class="location">${posts[i].location}</span>
                </div>
            </div>
            <div>
                <img class="img" src="${posts[i].post}">
            </div>
            <div class="interactions">
                <img class="icon like-btn" src="images/icon-heart.png">
                <img class="icon" src="images/icon-comment.png">
                <img class="icon" src="images/icon-dm.png">
                <p class="likes"><span>${posts[i].likes} likes</span></p>
                <p class="comment"><span>${posts[i].username}</span> ${posts[i].comment}</p>
            </div>
        </article>
        `
}

mainEl.innerHTML = html
mainEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-btn")) {
        const postEl = e.target.closest(".post")
        const index = Number(postEl.dataset.index)
        posts[index].likes  ++
        postEl.querySelector(".likes span").textContent = `${posts[index].likes} likes`
    }
})

mainEl.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains("img")) {
        const postEl = e.target.closest(".post")
        const index = Number(postEl.dataset.index)
        posts[index].likes  ++
        postEl.querySelector(".likes span").textContent = `${posts[index].likes} likes`
    }
})