// select dom elements
let searchBtn = document.getElementById('searchBtn');
let movieCont = document.getElementById('movieCont');
let sectionTitle = document.getElementById('sectionTitle');
let searchResponse = document.getElementById('search-response');
let bSearchResponse = document.getElementById('bSearch-response');
let bookmarkList = document.querySelector('.nav-link-two');
let MovieList = document.querySelector('.nav-link-one');
let bookmarkedContainer = document.getElementById('bookMovieCont')
let movieResult = document.getElementById('movieResult');
let bookmarkResult = document.getElementById('bookmarkResult');
let moreDetailsCont = document.getElementById('moreDetailsCont');
let movieWrapper = document.getElementById('movieWrapper');
let logo = document.getElementById('logo');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    document.location.reload(true);
    console.log(e.target);
});


// display homepage movies
let displayMovies = () => {
    fetch('https://api.tvmaze.com/schedule')
        .then(response => response.json())
        .then(result => printMovies(result));
}

function printMovies(result) {
    let html = "";
    let movies = [];
    for (let i = 0; i <= 9; i++) {
        movies.push(result[i]);
    }
    let movieName = [];
    movies.forEach(movie => {
        if (!(movieName.includes(movie.show.name))) {
            html += `<div class="col">
                <div class="card movie-item mb-3" id="${movie.show.id}" style="width: 18rem;">
                    <i class="fa-regular fa-bookmark" id="bookmark"></i>
                    <i class="fa-solid fa-bookmark noDisplay" id="noBookmark"></i>
                    <img src="${movie.show.image.original}" class="card-img-top movie-image" alt="...">
                    <div class="card-body">
                <h5 class="card-title" id="movieTitle">${movie.show.name}</h5>
                <a href="#" class="btn" id="moreBtn">More information</a>
                    </div>
                </div>
                </div>`;
            movieName.push(movie.show.name);
        }
    });
    document.getElementById('movieCont').innerHTML = html;
}
displayMovies();


// display movies searchResponse
searchBtn.addEventListener('click', () => {
    if (movieResult.classList.contains('noDisplay')) {
        bookmarkResult.classList.add('noDisplay');
        bookmarkList.childNodes[0].classList.remove('red');
        movieResult.classList.remove('noDisplay');
        MovieList.childNodes[0].classList.add('red');
    } else {

    };
    sectionTitle.textContent = 'Your Search Result';
    searchResponse.classList.remove('noDisplay');
    movieCont.classList.add('noDisplay');
    let searchContent = document.getElementById('searchInput').value;
    fetch(`https://api.tvmaze.com/search/shows?q=${searchContent}`)
        .then(response => response.json())
        .then(result => display(result))
})

function display(result) {
    let html = '';
    if (!(result.length < 1)) {
        searchResponse.classList.add('noDisplay');
        result.forEach((resul) => {
            let booked = "";
            let noBooked = "";
            let { id } = resul.show;
            id = id.toString();
            if ((bookmarked.includes(id))) {
                booked = 'display';
                noBooked = 'noDisplay';
            } else {
                booked = 'noDisplay';
                noBooked = 'display';
            }
            if (!(resul.show.image === null)) {
                html += `<div class="col">
            <div class="card movie-item mb-3" id="${resul.show.id}" style="width: 18rem;">
                <i class="fa-regular fa-bookmark ${noBooked}" id="bookmark"></i>
                <i class="fa-solid fa-bookmark ${booked}" id="noBookmark"></i>
                <img src="${resul.show.image.original}" class="card-img-top movie-image" alt="...">
                <div class="card-body">
            <h5 class="card-title" id="movieTitle">${resul.show.name}</h5>
            <a href="#" class="btn" id="moreBtn">More information</a>
                </div>
            </div>
            </div>`;
            } else {
                console.log('null')
            }
            // let { original } = resul.show.image;

        })
        movieCont.innerHTML = html;
        movieCont.classList.remove('noDisplay');
    } else {
        searchResponse.textContent = 'Sorry Search not Found';
    }
}


// add a movie to bookmarked
let bookmarked = [];
let bookmarkBtn = document.getElementById('bookmark');
let removeBookmarkBtn = document.getElementById('noBookmark');
movieCont.addEventListener('click', (e) => {

    if (e.target.id === "bookmark") {
        let id = e.target.parentElement.id;
        bookmarked.push(id);
        // console.log(bookmarked);
        let target1 = e.target;
        target1.classList.add('noDisplay');
        target1.nextElementSibling.classList.remove('noDisplay')
            // console.log(e.target);
    } else if (e.target.id === "noBookmark") {
        let id = e.target.parentElement.id;
        let start = bookmarked.indexOf(id);
        bookmarked.splice(start, 1);
        e.target.previousElementSibling.classList.remove('noDisplay');
        e.target.classList.add('noDisplay');
    } else if (e.target.id === "moreBtn") {
        e.preventDefault();
        let id = e.target.parentElement.parentElement.id;
        moreInfo(id);

    }
})


// remove movie from bookmark
bookmarkedContainer.addEventListener('click', (e) => {
    if (e.target.id === "noBookmark") {
        let id = e.target.parentElement.id;
        let start = bookmarked.indexOf(id);
        bookmarked.splice(start, 1);
        e.target.previousElementSibling.classList.remove('noDisplay');
        e.target.classList.add('noDisplay');
        let col = e.target.parentElement.parentElement
        col.parentElement.removeChild(col);
    } else if (e.target.id === "moreBtn") {
        e.preventDefault();
        let id = e.target.parentElement.parentElement.id;
        moreInfo(id);
    }
});



// nav bar countrols
MovieList.addEventListener('click', (e) => {
    e.preventDefault();
    bookmarkResult.classList.add('noDisplay');
    bookmarkList.childNodes[0].classList.remove('red');
    movieResult.classList.remove('noDisplay');
    MovieList.childNodes[0].classList.add('red');
    movieCont.childNodes.forEach((child) => {
        let movie = child.childNodes[1];
        if (!(bookmarked.includes(movie.id))) {
            movie.childNodes[3].classList.add('noDisplay');
            movie.childNodes[1].classList.remove('noDisplay');
        };

    })
});
bookmarkList.addEventListener('click', (e) => {
    e.preventDefault();
    if (bookmarked.length < 1) {

        movieResult.classList.add('noDisplay');
        bSearchResponse.classList.remove('noDisplay');
    } else {
        bSearchResponse.classList.add('noDisplay');
        showBookmarked(bookmarked);
    }
    bookmarkList.childNodes[0].classList.add('red');
    bookmarkResult.classList.remove('noDisplay');
    MovieList.childNodes[0].classList.remove('red');
    bookmarkedContainer.childNodes.forEach((child) => {
        let movie = child.childNodes[1];
        if (bookmarked.includes(movie.id)) {
            console.log('its present');
        } else {

            bookmarkedContainer.innerHTML = ''
        }
    })
});





// display bookmarked movies
function showBookmarked(bookmarked) {
    let html1 = '';
    bookmarked.forEach(bookmark => {
        fetch(`https://api.tvmaze.com/shows/${bookmark}`)
            .then(response => response.json())
            .then(result => displayBookmarked(result))

        function displayBookmarked(result) {
            let { id, name } = result;
            let booked = "";
            let noBooked = "";
            id = id.toString();
            if ((bookmarked.includes(id))) {

                booked = 'display';
                noBooked = 'noDisplay';
            } else {
                booked = 'noDisplay';
                noBooked = 'display';
            }
            html1 += `<div class="col">
                <div class="card movie-item mb-3" id="${id}" style="width: 18rem;">
                    <i class="fa-regular fa-bookmark ${noBooked}" id="bookmark"></i>
                    <i class="fa-solid fa-bookmark ${booked}" id="noBookmark"></i>
                    <img src="${result.image.original}" class="card-img-top movie-image" alt="...">
                    <div class="card-body">
                <h5 class="card-title" id="movieTitle">${name}</h5>
                <a href="#" id="moreBtn" class="btn">More information</a>
                    </div>
                </div>
                </div>`;
            bookmarkedContainer.innerHTML = html1;
            movieResult.classList.add('noDisplay');
            // console.log(bookmarkedContainer);
        }
    });
};


// display movie details
function moreInfo(id) {
    fetch(`https://api.tvmaze.com/shows/${id}`)
        .then(response => response.json())
        .then(result => display(result))

    function display(result) {
        let { id, name, genres, summary } = result;
        let { average } = result.rating;
        let { medium } = result.image;
        let html =
            `<div class="movieDetails mb-0 p-lg-5">
                <div class="moviePicture mb-5">
                    <img src="${medium}" alt="" srcset="">
                </div>
                <h2 class="name">${name}</h2>
                <p class="description"> ${summary}</p>
                <p class="rating"><em><span class="">Rating:</span> ${average}</p></em>
                <p class="genre mb-0"> <em><span class="">Genre:</span> ${genres}</p></em>
                <a href="#" class="btn mt-4 close" id="close"><i class="fa-solid fa-xmark" id="close"></i></a>
            </div>`;
        moreDetailsCont.innerHTML = html;
        moreDetailsCont.classList.remove('noDisplay');
        movieWrapper.classList.add('noDisplay');
    }
}

moreDetailsCont.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.id === 'close') {
        moreDetailsCont.classList.add('noDisplay');
        movieWrapper.classList.remove('noDisplay');
        console.log(e.target);
    }
});