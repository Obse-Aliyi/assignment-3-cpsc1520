async function appInt() {
    const res = await fetch('https://661c9956e7b95ad7fa6a9e92.mockapi.io/albums');
    const payload = await res.json();
    handleSearch(payload);
}


// TASK 1
const searchButton = document.getElementById('search-button');
const favoritesButton = document.getElementById('favorites-button');
const searchAlbum = document.getElementById('search-album');
const favoritesAlbum = document.getElementById('favorites-album');

searchButton.addEventListener("click", () => {
    searchButton.classList.add('active');
    favoritesButton.classList.remove('active');
    searchAlbum.classList.remove("d-none");
    favoritesAlbum.classList.add("d-none");
});

favoritesButton.addEventListener("click", () => {
    searchButton.classList.remove('active');
    favoritesButton.classList.add('active');
    favoritesAlbum.classList.remove("d-none");
    searchAlbum.classList.add("d-none");
});

// TASK 2
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('query').value.toLowerCase();
    const res = await fetch('https://661c9956e7b95ad7fa6a9e92.mockapi.io/albums');
    const payload = await res.json();
    const results = payload.filter(album =>
        album.albumName.toLowerCase().includes(query) ||
        album.artistName.toLowerCase().includes(query)
    );

    renderSearchResults(results);
}

function renderSearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    results.forEach(album => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

        listItem.innerHTML = `
            <div class="ms-2 me-auto">
                <div class="fw-bold">
                    ${album.albumName}
                    <span class="badge bg-primary rounded-pill">${album.averageRating}</span>
                </div>
                <span>${album.artistName}</span>
            </div>
            <button data-uid="${album.uid}" type="button" class="btn btn-success add-to-favorites">Add to Favorites</button>
        `;

        resultsContainer.appendChild(listItem);
    });
}

