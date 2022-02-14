const searchResults = document.querySelector(".search-results");
const searchQuery = document.querySelector(".search-query");

const addListener = (selector, eventName, callback) => {
    document.querySelector(selector).addEventListener(eventName, callback);
};

const fetch = (method, url, callback) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function () {
        if (xhr.readyState == 4 && xhr.status === 200) {
            let { data } = JSON.parse(xhr.responseText);
            return callback(data);
        } else {
            console.log("Status Code: " + xhr.status);
        }
    });

    xhr.open(method, url, false);
    xhr.send();
};

const renderDom = (response, callback) => {
    response.forEach(callback)
};

const cleanOldData = () => {
    searchResults.innerHTML = '';
};

addListener(".search-btn", "click", (event) => {
    event.preventDefault();

    cleanOldData();

    let url =
        "https://api.giphy.com/v1/gifs/search?api_key=BTaqkVbWbQ4xauEOt2bf6UpHJtHoqcrY&q=" +
        searchQuery.value;


    
    fetch("GET", url, (response) => {
    
        renderDom(response,(e) => {
            const image = document.createElement("img");
            image.src = e.images.original.url;
            searchResults.appendChild(image);
        });
    });
});
