const accessKey = "bfrFuNSbdcGcXww-KBf6VgsQY8lpJQiaAUCNt64dGVc"

const formEl = document.querySelector('form')
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);

    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const link = document.createElement("a")
        link.href = result.links.html;
        link.target = "_blank"
        link.textContent = result.alt_description;

        const likeWrapper = document.createElement("div");
        likeWrapper.classList.add("like-wrapper");
        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa", "fa-heart");
        const likeCount = document.createElement("span");
        likeCount.textContent = result.likes;
      
        likeWrapper.appendChild(likeIcon);
        likeWrapper.appendChild(likeCount);

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(likeWrapper);
        imageWrapper.appendChild(link);
        searchResults.appendChild(imageWrapper)
    });

    page++;
    if(page > 1){
        showMore.style.display = "block"
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(event);
    page = 1;
    searchImages()
});

showMore.addEventListener('click', () =>{
    searchImages();
})