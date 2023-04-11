
 
    var owl;
    owl = $("#owl-demo").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        mouseDrag: false,
        nav: true,
        items: 4,
        loop: true,
        margin: 50,
        navText: ["<i class='fa fa-thin fa-arrow-left'></i>", "<i class='fa fa-thin fa-arrow-right'></i>"],
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });

    $("#owl-demo2").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        mouseDrag: false,
        nav: true,
        items: 4,
        loop: true,
        margin: 50,
        navText: ["<i class='fa fa-thin fa-arrow-left'></i>", "<i class='fa fa-thin fa-arrow-right'></i>"],
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    var posterbackground = document.getElementById("posterbackground");
    owl.on('changed.owl.carousel', function (e) {
        var backgroundvalue = $(".owl-item").eq(e.relatedTarget.current()).children().first().children().first().children().first().children().first().val();
        posterbackground.style.backgroundImage = `linear-gradient(0deg, black, transparent 50%) ,url(https://image.tmdb.org/t/p/w500/${backgroundvalue})`;
    })
    function DisplayReviews(data) {
        var content = "";;
        var image = "";
        for (var i = 0; i <= data.length; i++) {
            if (data[i] !== undefined) {
                if (data[i].author_details.avatar_path !== 'undefined' && data[i].author_details.avatar_path !== null) {
                    if (data[i].author_details.avatar_path.toString().includes("avatar") == true) {
                        image = data[i].author_details.avatar_path.toString().substring(1, data[i].author_details.avatar_path.toString().length)
                    }
                    else {
                        image = "https://image.tmdb.org/t/p/w500/" + data[i].author_details.avatar_path.toString();
                    }
                    content += `
            <div class="reviewitem">
            <div class="usercontent">
            <div class="user-image">
            <img src="${image}">
            </div>
            <div class="userName pt-2"><h6>${data[i].author}</h6></div>
            <div class="publishadate"><p>${data[i].created_at}</p></div>
            <div class="Reviewcontent">
            <p>${data[i].content}</p>
            </div>
            </div>
            </div>
            `
                }
            }
            var Review = document.getElementById("Reviewsitems")
            Review.innerHTML = content
        }
    }
    function displaySearchResult() {
        var data = `<div class="row">`;
        var searchresultdiv = document.getElementById("searchResults");
        for (var i = 0; i <= searchResult.length; i++) {
            var image;
            if (searchResult[i] !== undefined) {
                if (searchResult[i].poster_path == null) {
                    image = "./images/default.jpg";
                }
                else {
                    image = "https://image.tmdb.org/t/p/w500/" + searchResult[i].poster_path;
    
                }
                if (searchResult[i] != null) {
                    var title;
                    if (searchResult[i].title != undefined) {
                        title = searchResult[i].title
    
                    }
                    else if (searchResult[i].original_title != undefined) {
                        title = searchResult[i].original_title
    
    
    
                    }
                    else {
                        title = searchResult[i].name
                    }
                    data += `<div class="col-lg-3 col-6">
                    <a href="./Details.html?ID=${searchResult[i].id}&&type=${searchResult[i].media_type}">
                    <div class="searchitemcontent mb-4">
                    <div class="similer-image">
                    <img src="${image}">
                    </div>
                    <div class="similer-title white pt-2"><h6>${title}</h6></div>
                    <div class="genra"><p>${genrastring}</p></div>
                    <div class="ratingdiv white"><i class="fa fa-star"></i><span class="ratingtext">${searchResult[i].vote_average}</span></div>
                    </div>
                    </a>
                    </div>`
    
                }
            }
        }
        data += "</div>"
        searchresultdiv.innerHTML = "";
        searchresultdiv.innerHTML = data
    }
    function getMovies() {
        var counter = 0;
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US&page=${counter}sort_by=popularity.desc&include_adult=false&include_video=truewith_watch_monetization_types=flatrate`)
            .then(function (response) {
                // response is a json string
                return response.json();// convert it to a pure JavaScript object
            })
            .then(function (data) {

                var data = JSON.stringify(data.results);
                var Result = JSON.parse(data);
                console.log(Result);
                posterbackground.style.backgroundImage = `linear-gradient(0deg, black, transparent 50%) ,url(https://image.tmdb.org/t/p/w500/${Result[0].backdrop_path})`;
                for (val of Result) {
                    var hiddenminput = document.createElement("input");
                    hiddenminput.type = "hidden";
                    var movieitem = document.createElement("div");
                    var movielayer = document.createElement("div");
                    movielayer.classList.add("middle")
                    movieitem.classList.add("movieitem");
                    movieitem.appendChild(hiddenminput)
                    hiddenminput.value = `${Result[counter].backdrop_path}`;
                    var movieimagediv = document.createElement("div");
                    movieimagediv.classList.add("movieimg");
                    var movieimage = document.createElement("img");
                    movieimage.style.width = "100%";
                    var movietitlediv = document.createElement("div");
                    movietitlediv.classList.add("movietitle");
                    var ratingdiv = document.createElement("div");
                    ratingdiv.classList.add("ratingdiv", "white");
                    var staricon = document.createElement("i");
                    staricon.classList.add("fa", "fa-star");
                    var rating = document.createElement("span");
                    rating.classList.add("ratingtext");
                    var movietitle = document.createElement("h5");
                    var owlcrouselitem = document.createElement("div");
                    owlcrouselitem.classList.add("item");
                    var movielink = document.createElement("a");
                    movielink.classList.add("movielink");
                    movielink.href = "./Details.html?ID=" + Result[counter].id + "&&type=movie";
                    owlcrouselitem.appendChild(movielink);
                    movielink.appendChild(movieitem);
                    movieitem.appendChild(movieimagediv)
                    movieitem.appendChild(movielayer)
                    movieitem.appendChild(movieimagediv)
                    movieimagediv.appendChild(movieimage)
                    movieitem.appendChild(movietitlediv)
                    movietitlediv.appendChild(movietitle)
                    movieitem.appendChild(movietitlediv)
                    $('#owl-demo').trigger('add.owl.carousel', [owlcrouselitem])
                        .trigger('refresh.owl.carousel');

                    var Genradiv = document.createElement("div");
                    Genradiv.classList.add("Genradiv");
                    var Genra = document.createElement("p");
                    Genradiv.appendChild(Genra)
                    movieitem.appendChild(Genradiv)
                    var genralist = [];
                    genralist.push(Result[counter])
                    for (var val of genralist) {
                        if (val.genre_ids != undefined) {
                            var genrastrinarray = JSON.stringify(val.genre_ids).split(",");
                            var finalResult = JSON.parse(genrastrinarray)
                            getgenra(finalResult, Genra, "movie")
                        }
                    }
                    movieitem.appendChild(staricon)
                    movieitem.appendChild(ratingdiv)
                    movieitem.appendChild(rating)
                    ratingdiv.appendChild(staricon)
                    ratingdiv.appendChild(rating)
                    if (Result[counter].vote_average != undefined) {
                        rating.innerHTML = `${Result[counter].vote_average}`;
                    }
                    movieimage.src = "https://image.tmdb.org/t/p/w500/" + Result[counter].poster_path;
                    movietitle.innerHTML = Result[counter].original_title
                    counter = counter + 1;
                }

            }).catch(function (err) {
                console.log(err);
            });;
    }

    function getTrending() {
        var trendingcounter = 0;
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=28d102c23a94c950a5f83f4fd7517be8`)
            .then(function (response) {
                // response is a json string
                return response.json();// convert it to a pure JavaScript object
            })
            .then(function (data) {
                var trendingtab = document.getElementById("Trending");
                var row = document.createElement("div");
                row.classList.add("row");
                trendingtab.appendChild(row)
                var data = JSON.stringify(data.results);
                var Result = JSON.parse(data);
                for (val of Result) {
                    if (trendingcounter >= 6) {
                        return;
                    }
                    else {
                        var column = document.createElement("div");
                        column.classList.add("col-6", "mb-3");
                        row.appendChild(column);
                        var moviebox = document.createElement("div");
                        var link = document.createElement("a");
                        link.classList.add("movielink");
                        link.href = "./Details.html?ID=" + val.id + "&&type=" + val.media_type;
                        column.appendChild(link);
                        moviebox.classList.add("movie-box");
                        link.appendChild(moviebox)
                        column.appendChild(link)
                        var movieimagediv = document.createElement("div");
                        movieimagediv.classList.add("movie-image");
                        moviebox.appendChild(movieimagediv)
                        var Genradiv2 = document.createElement("div");
                        Genradiv2.classList.add("Genradiv2");
                        var ratingdiv = document.createElement("div");
                        ratingdiv.classList.add("ratingdiv", "white");
                        var staricon = document.createElement("i");
                        staricon.classList.add("fa", "fa-star");
                        var rating = document.createElement("span");
                        rating.classList.add("ratingtext");
                        var movieimage = document.createElement("img");
                        movieimage.src = "https://image.tmdb.org/t/p/w500/" + Result[trendingcounter].poster_path
                        movieimagediv.appendChild(movieimage)
                        var movietitlediv = document.createElement("div");
                        movietitlediv.classList.add("movie-title");
                        moviebox.appendChild(movietitlediv)
                        var movietitle = document.createElement("h4");
                        if (Result[trendingcounter].original_title == undefined) {
                            movietitle.innerText = Result[trendingcounter].name

                        }
                        else {
                            movietitle.innerText = Result[trendingcounter].original_title

                        }
                        movietitlediv.appendChild(movietitle);
                        var Genra2 = document.createElement("p");
                        Genradiv2.appendChild(Genra2)
                        moviebox.appendChild(Genradiv2)
                        var reviewdiv = document.createElement("div")
                        reviewdiv.classList.add("reviewbreif")
                        var review = document.createElement("p")
                        var genralist = [];
                        genralist.push(Result[trendingcounter])
                        for (var val of genralist) {
                            if (val.genre_ids !== undefined) {
                                var genrastrinarray = JSON.stringify(val.genre_ids).split(",");
                                var finalResult = JSON.parse(genrastrinarray)
                                getgenra(finalResult, Genra2, Result[trendingcounter].media_type)
                            }
                        }
                        moviebox.appendChild(staricon)
                        moviebox.appendChild(ratingdiv)
                        moviebox.appendChild(rating)
                        ratingdiv.appendChild(staricon)
                        if (Result[trendingcounter].vote_average !== undefined) {
                            rating.innerHTML = `${Result[trendingcounter].vote_average}`;
                        }
                        ratingdiv.appendChild(rating)
                        moviebox.appendChild(reviewdiv)
                        reviewdiv.appendChild(review);

                        review.innerHTML = `${Result[trendingcounter].overview}`;
                        trendingcounter = trendingcounter + 1;
                    }

                }

            });
    }
    function getTrending2() {
        var trendingcounter = 0;
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US`)
            .then(function (response) {
                // response is a json string
                return response.json();// convert it to a pure JavaScript object
            })
            .then(function (data) {
                var row2 = document.createElement("div");
                row2.classList.add("row");
                var data = JSON.stringify(data.results);
                var Result = JSON.parse(data);
                for (val of Result) {
                    if (trendingcounter >= 20) {
                        return;
                    }
                    else {
                        var column2 = document.createElement("div");
                        column2.classList.add("col-6", "mb-3");
                        row2.appendChild(column2);
                        var bookingbox2 = document.createElement("div");
                        bookingbox2.classList.add("booking-box");
                        column2.appendChild(bookingbox2)
                        var bookingimagediv2 = document.createElement("div");
                        bookingimagediv2.classList.add("booking-image");
                        bookingbox2.appendChild(bookingimagediv2)
                        var Genradiv2 = document.createElement("div");
                        Genradiv2.classList.add("Genradiv2");
                        var ratingdiv2 = document.createElement("div");
                        ratingdiv2.classList.add("ratingdiv", "white");
                        var staricon2 = document.createElement("i");
                        staricon2.classList.add("fa", "fa-star");
                        var rating2 = document.createElement("span");
                        rating2.classList.add("ratingtext");
                        var bookingimage2 = document.createElement("img");
                        bookingimage2.src = "https://image.tmdb.org/t/p/w500/" + Result[trendingcounter].poster_path
                        bookingimagediv2.appendChild(bookingimage2)
                        var bookingtitlediv2 = document.createElement("div");
                        bookingtitlediv2.classList.add("booking-title");
                        bookingbox2.appendChild(bookingtitlediv2)
                        var bookingtitle2 = document.createElement("h4");
                        if (Result[trendingcounter].original_title == undefined) {
                            bookingtitle2.innerText = Result[trendingcounter].name

                        }
                        else {
                            bookingtitle2.innerText = Result[trendingcounter].original_title

                        }
                        bookingtitlediv2.appendChild(bookingtitle2);
                        var Genra2 = document.createElement("p");
                        Genradiv2.appendChild(Genra2)
                        bookingbox2.appendChild(Genradiv2)
                        var genralist = [];
                        genralist.push(Result[trendingcounter])
                        for (var val of genralist) {
                            if (val.genre_ids !== undefined) {
                                var genrastrinarray = JSON.stringify(val.genre_ids).split(",");
                                var finalResult = JSON.parse(genrastrinarray)
                                getgenra(finalResult, Genra2, "movie")
                            }
                        }
                        bookingbox2.appendChild(staricon2)
                        bookingbox2.appendChild(ratingdiv2)
                        bookingbox2.appendChild(rating2)
                        ratingdiv2.appendChild(staricon2)
                        if (Result[trendingcounter].vote_average !== undefined) {
                            rating2.innerHTML = `${Result[trendingcounter].vote_average}`;
                        }
                        ratingdiv2.appendChild(rating2)

                        trendingcounter = trendingcounter + 1;
                    }
                    $('#owl-demo2').owlCarousel('add', [bookingbox2]).owlCarousel('update');


                }

            }).catch(function (err) {
                console.log(err);
            });;
    }
    function getTvseries() {
        var trendingcounter = 0;
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US&page=1`)
            .then(function (response) {
                // response is a json string
                return response.json();// convert it to a pure JavaScript object
            })
            .then(function (data) {
                var trendingtab = document.getElementById("SERIES");
                var row = document.createElement("div");
                row.classList.add("row");

                trendingtab.appendChild(row)
                var data = JSON.stringify(data.results);
                var Result = JSON.parse(data);
                for (val of Result) {
                    if (trendingcounter >= 12) {
                        return;
                    }
                    else {
                        var column = document.createElement("div");
                        column.classList.add("col-6", "col-lg-2", "mb-3");
                        row.appendChild(column);
                        var moviebox = document.createElement("div");
                        moviebox.classList.add("tv-box");
                        var link = document.createElement("a");
                        link.classList.add("movielink");
                        link.href = "./Details.html?ID=" + val.id + "&&type=tv"
                        column.appendChild(link);
                        moviebox.classList.add("movie-box");
                        link.appendChild(moviebox)
                        column.appendChild(link)
                        var movieimagediv = document.createElement("div");
                        movieimagediv.classList.add("tv-image");
                        moviebox.appendChild(movieimagediv)
                        var Genradiv3 = document.createElement("div");
                        Genradiv3.classList.add("Genradiv3");
                        var ratingdiv = document.createElement("div");
                        ratingdiv.classList.add("ratingdiv", "white");
                        var staricon = document.createElement("i");
                        staricon.classList.add("fa", "fa-star");
                        var rating = document.createElement("span");
                        rating.classList.add("ratingtext");
                        var movieimage = document.createElement("img");
                        movieimage.src = "https://image.tmdb.org/t/p/w500/" + Result[trendingcounter].poster_path
                        movieimagediv.appendChild(movieimage)
                        var movietitlediv = document.createElement("div");
                        movietitlediv.classList.add("tv-title");
                        moviebox.appendChild(movietitlediv)
                        var movietitle = document.createElement("h5");
                        if (Result[trendingcounter].original_title == undefined) {
                            movietitle.innerText = Result[trendingcounter].name

                        }
                        else {
                            movietitle.innerText = Result[trendingcounter].original_title

                        }
                        movietitlediv.appendChild(movietitle);
                        var Genra3 = document.createElement("p");
                        Genradiv3.appendChild(Genra3)
                        moviebox.appendChild(Genradiv3)
                        var genralist = [];
                        genralist.push(Result[trendingcounter])
                        for (var val of genralist) {
                            if (val.genre_ids !== undefined) {
                                var genrastrinarray = JSON.stringify(val.genre_ids).split(",");
                                var finalResult = JSON.parse(genrastrinarray)
                                getgenra(finalResult, Genra3, "tv")
                            }
                        }
                        moviebox.appendChild(staricon)
                        moviebox.appendChild(ratingdiv)
                        moviebox.appendChild(rating)
                        ratingdiv.appendChild(staricon)
                        if (Result[trendingcounter].vote_average !== undefined) {
                            rating.innerHTML = `${Result[trendingcounter].vote_average}`;
                        }
                        ratingdiv.appendChild(rating)
                        trendingcounter = trendingcounter + 1;
                    }
                }

            });
    }
    function getCartoons() {
        var cartoncounter = 0;
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=28d102c23a94c950a5f83f4fd7517be8&with_genres=16 `)
            .then(function (response) {
                // response is a json string
                return response.json();// convert it to a pure JavaScript object
            })
            .then(function (data) {
                var trendingtab = document.getElementById("CARTOONS");
                var row = document.createElement("div");
                row.classList.add("row");

                trendingtab.appendChild(row)
                var data = JSON.stringify(data.results);
                var Result = JSON.parse(data);
                for (val of Result) {
                    if (cartoncounter >= 12) {
                        return;
                    }
                    else {
                        var column = document.createElement("div");
                        column.classList.add("col-6", "col-lg-2", "mb-3");
                        row.appendChild(column);
                        var cartoonbox = document.createElement("div");
                        cartoonbox.classList.add("cartoon-box");
                        var link = document.createElement("a");
                        link.classList.add("movielink");
                        link.href = "./Details.html?ID=" + val.id + "&&type=" + "movie";
                        column.appendChild(link);
                        cartoonbox.classList.add("movie-box");
                        link.appendChild(cartoonbox)
                        column.appendChild(link)
                        var cartoonimagediv = document.createElement("div");
                        cartoonimagediv.classList.add("cartoon-image");
                        cartoonbox.appendChild(cartoonimagediv)
                        var Genradiv4 = document.createElement("div");
                        Genradiv4.classList.add("Genradiv4");
                        var ratingdiv = document.createElement("div");
                        ratingdiv.classList.add("ratingdiv", "white");
                        var staricon = document.createElement("i");
                        staricon.classList.add("fa", "fa-star");
                        var rating = document.createElement("span");
                        rating.classList.add("ratingtext");
                        var cartoonimage = document.createElement("img");
                        cartoonimage.src = "https://image.tmdb.org/t/p/w500/" + Result[cartoncounter].poster_path
                        cartoonimagediv.appendChild(cartoonimage)
                        var cartoontitlediv = document.createElement("div");
                        cartoontitlediv.classList.add("cartoon-title");
                        cartoonbox.appendChild(cartoontitlediv)
                        var cartoontitle = document.createElement("h5");
                        if (Result[cartoncounter].original_title == undefined) {
                            cartoontitle.innerText = Result[cartoncounter].name

                        }
                        else {
                            cartoontitle.innerText = Result[cartoncounter].original_title

                        }
                        cartoontitlediv.appendChild(cartoontitle);
                        var Genra4 = document.createElement("p");
                        Genradiv4.appendChild(Genra4)
                        cartoonbox.appendChild(Genradiv4)
                        var genralist = [];
                        genralist.push(Result[cartoncounter])
                        for (var val of genralist) {
                            if (val.genre_ids !== undefined) {
                                var genrastrinarray = JSON.stringify(val.genre_ids).split(",");
                                var finalResult = JSON.parse(genrastrinarray)
                                getgenra(finalResult, Genra4, "movie")
                            }
                        }
                        cartoonbox.appendChild(staricon)
                        cartoonbox.appendChild(ratingdiv)
                        cartoonbox.appendChild(rating)
                        ratingdiv.appendChild(staricon)
                        if (Result[cartoncounter].vote_average !== undefined) {
                            rating.innerHTML = `${Result[cartoncounter].vote_average}`;
                        }
                        ratingdiv.appendChild(rating)
                        cartoncounter = cartoncounter + 1;
                    }
                }

            }).catch(function (err) {
                console.log(err);
            });;
    }
    function getCompnies() {
        for (var i = 1; i <= 6; i++) {
            var Compniescounter = 1;
            fetch(`https://api.themoviedb.org/3/company/${i}/images?api_key=28d102c23a94c950a5f83f4fd7517be8 `)
                .then(function (response) {
                    // response is a json string
                    return response.json();// convert it to a pure JavaScript object
                })
                .then(function (data) {
                    var partners = document.getElementById("partnersitems");
                    var column = document.createElement("div");
                    column.classList.add("col-6", "col-lg-2", "mb-3");
                    partners.appendChild(column)
                    var data = JSON.stringify(data.logos);
                    var Result = JSON.parse(data);
                    for (val of Result) {
                        if (Compniescounter == 1) {
                            var parnterimgdiv = document.createElement("div");
                            parnterimgdiv.classList.add("parnterimg");
                            column.appendChild(parnterimgdiv);
                            var parnterimg = document.createElement("img");
                            parnterimg.src = "https://image.tmdb.org/t/p/w500/" + val.file_path
                            parnterimgdiv.appendChild(parnterimg);
                            break;
                        }
                    }
                });
        }
    }
    async function getgenra(finalResult, Genra, type) {
        var genrastring = "";
        var array = JSON.parse("[" + finalResult + "]");
        return await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US`)
            .then(function (response) {
                // response is a json string
                return response.json();// convert it to a pure JavaScript object
            })
            .then(function (data2) {
                var data = JSON.stringify(data2.genres);
                var Result2 = JSON.parse(data);
                array.forEach(element => {
                    if (element !== "undefined") {
                        const filteredgenras = Result2.filter(val => val.id.toString().includes(element));
                        genrastring = genrastring + filteredgenras[0].name + " ".replace(" ", ",");
                    }
                });


                if (Genra !== null) {
                    Genra.innerHTML = genrastring.toString().substring(0, genrastring.length - 1);
                }
                else {

                    return genrastring.toString();
                }

            })
            .catch(function (err) {
                console.log(err);
            });
    }
    function getDbItemByID(itemID, type) {
        fetch(`https://api.themoviedb.org/3/${type}/${itemID}?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US `)
            .then(function (response) {
                // response is a json string
                return response.json();// convert it to a pure JavaScript object
            })
            .then(function (data) {
                var tvseriescolumn=document.getElementById("layout");

                var postbackground = document.getElementsByClassName("innerposterbackground");
                var Movietitle = document.getElementById("Movietitle");
                var movieImage = document.getElementById("movieImage");
                var rating = document.getElementById("rating");
                var detrailsGenra = document.getElementById("Genre");
                var Releaseyear = document.getElementById("Releaseyear");
                var movieImage = document.getElementById("movieImage");
                var rating = document.getElementById("rating");
                var Runningtime = document.getElementById("Runningtime");
                var Country = document.getElementById("Country");
                var overview = document.getElementById("overview");
                var data = JSON.stringify(data);
                var Result = JSON.parse(data);
                $(postbackground).css("background-image", `linear-gradient(90deg, black, transparent 100%) ,url(https://image.tmdb.org/t/p/w500/${Result.backdrop_path})`);
                
                
                if (Result.original_title == undefined) {
                    Movietitle.innerHTML = Result.original_name;
                }
                else {

                    Movietitle.innerHTML = Result.original_title

                }
                movieImage.src = `https://image.tmdb.org/t/p/w500/${Result.poster_path}`
                var genralist = [];
                var detailsgenra = ""
                genralist.push(Result)
                var detailcounter = 0;
                for (var val of genralist) {
                    if (val.genres !== undefined && val.genres.length > 0) {
                        detailsgenra = detailsgenra + val.genres[detailcounter].name + " ".replace(" ", ",").toString().substring(0, detailsgenra.length - 1);;
                    }
                    detailcounter = detailcounter + 1;
                }
                GetVideoByID(itemID, type)
                if(type=="tv")
                {                  
                    tvseriescolumn.classList.remove("col-lg-6","col-12")
                    tvseriescolumn.classList.add("col-lg-12","col-12")           
                }
                detrailsGenra.innerHTML = " " + detailsgenra
                rating.innerHTML = " " + Result.vote_average
                Releaseyear.innerHTML = " " + Result.release_date;
                Runningtime.innerHTML = " " + Result.runtime + " Min";
                Country.innerHTML = " " + Result.production_companies[0].origin_country;
                overview.innerHTML = " " + Result.overview;

            });
    }
    function GetVideoByID(itemID, type) {
        fetch(`https://api.themoviedb.org/3/${type}/${itemID}/videos?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US `)
            .then(function (response) {
                // response is a json string
                return response.json();// convert it to a pure JavaScript object
            })
            .then(function (data) {
                var trailler = document.getElementById("trailler");
                var data = JSON.stringify(data.results);
                var Result = JSON.parse(data);

                if (Result[0] == null) {
                    trailler.src = "https://www.youtube.com/embed/" + "AjWfY7SnMBI"

                }
                else {
                    trailler.src = "https://www.youtube.com/embed/" + Result[0].key;

                }
            });
    }
   
    var genrastring = "";
    function DisplaysimilarResult(data, type) {

        var content = `<div class="row mt-5">`;
        var image = "";

        for (var i = 0; i <= data.length; i++) {
            if (i == 8) {
                return
            }
            else {

                var similteritems = [];
                if (data[i].genre_ids.length > 0) {
                    similteritems.push(data[i].genre_ids)
                    getgenra(similteritems, null, type).then((a) => {
                        var title;
                        if (data[i].title != undefined) {
                            title = data[i].title

                        }
                        else if (data[i].original_title != undefined) {
                            title = data[i].original_title



                        }
                        else {
                            title = data[i].name
                        }
                        if (data[i].poster_path == null) {
                            image = "./images/default.jpg";
                        }
                        else {
                            image = "https://image.tmdb.org/t/p/w500/" + data[i].poster_path;

                        }
                        genrastring = a;

                        content += `
                    <div class="col-lg-6 col-6">
                    <a href="./Details.html?ID=${data[i].id}&&type=${type}">
                    <div class="itemcontent mb-4">
                    <div class="similer-image">
                    <img src="${image}">
                    </div>
                    <div class="similer-title white pt-2"><h6>${title}</h6></div>
                    <div class="genra"><p>${genrastring}</p></div>
                    <div class="ratingdiv white"><i class="fa fa-star"></i><span class="ratingtext">${data[i].vote_average}</span></div>
                    </div>
                    </a>
                    </div>`
                        var Review = document.getElementById("similier")
                        Review.innerHTML = content
                        i++;
                    });
                }


            }
        }
    }

    function getsimilarResult(itemID, type) {
        var data;
        var Request = new XMLHttpRequest();
        Request.open('get', `https://api.themoviedb.org/3/${type}/${itemID}/similar?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US&page=1`);
        Request.send()
        Request.onreadystatechange = function () {
            if (Request.readyState == 4 && Request.status == 200) {
                data = JSON.parse(Request.response).results
                DisplaysimilarResult(data, type)
            }
        }
    }
    var moviesphoto = [];
    async function getitemphotos(itemID, type) {
        var data = await fetch(`https://api.themoviedb.org/3/${type}/${itemID}/images?api_key=28d102c23a94c950a5f83f4fd7517be8 `);
        var Response = await data.json();
        moviesphoto = Response.backdrops;
        printData();
    }

    var seasonDetails=[];
    async function getEpisodes(itemID)
    {
        for(var i=1;i<=20;i++)
        {
            var data = await fetch(`https://api.themoviedb.org/3/tv/${itemID}/season/${i}?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US`);
            var Response = await data.json();
            if(Response.status !=34)
            {
                seasonDetails = Response.episodes;
                printseasonsdetails(i);
            }
        }
        }
      
function displaySearchResult() {
        var data = `<div class="row">`;
        var searchresultdiv = document.getElementById("searchResults");
        for (var i = 0; i <= searchResult.length; i++) {
            var image;
            if (searchResult[i] !== undefined) {
                if (searchResult[i].poster_path == null) {
                    image = "./images/default.jpg";
                }
                else {
                    image = "https://image.tmdb.org/t/p/w500/" + searchResult[i].poster_path;

                }
                if (searchResult[i] != null) {
                    var title;
                    if (searchResult[i].title != undefined) {
                        title = searchResult[i].title

                    }
                    else if (searchResult[i].original_title != undefined) {
                        title = searchResult[i].original_title



                    }
                    else {
                        title = searchResult[i].name
                    }
                    data += `<div class="col-lg-3 col-6">
                    <a href="./Details.html?ID=${searchResult[i].id}&&type=${searchResult[i].media_type}">
                    <div class="searchitemcontent mb-4">
                    <div class="similer-image">
                    <img src="${image}">
                    </div>
                    <div class="similer-title white pt-2"><h6>${title}</h6></div>
                    <div class="genra"><p>${genrastring}</p></div>
                    <div class="ratingdiv white"><i class="fa fa-star"></i><span class="ratingtext">${searchResult[i].vote_average}</span></div>
                    </div>
                    </a>
                    </div>`

                }
            }
        }
        data += "</div>"
        searchresultdiv.innerHTML = "";
        searchresultdiv.innerHTML = data
    }
    function printseasonsdetails(seasons)
    {
        $("#tvepisodes").removeClass("d-none");
        var data = ``;
        var relasedateseason =seasonDetails[0].air_date.split('-');

        // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
        // January - 0, February - 1, etc.
        var mydate = new Date(relasedateseason[0], relasedateseason[1] - 1, relasedateseason[2]); 
        data += `
        <div class="card mb-3">
                      <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                          <button class="btn btn-link white" data-toggle="collapse" data-target="#collapse${seasons}" aria-expanded="false" aria-controls="collapse${seasons}">
                          Season:${seasonDetails[seasons].season_number}
                          </button>
                          <br>
                          <span >${seasonDetails.length} Episodes  air date ${mydate.toDateString()}</span>
                        </h5>
                      </div>
                  
                      <div id="collapse${seasons}" class="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                        <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Air Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        `
                   

                                seasonDetails.forEach(element => {
                                        var relasedateepisode =element.air_date.split('-');
                                        var mydate2 = new Date(relasedateepisode[0], relasedateepisode[1] - 1, relasedateepisode[2]); 
                                        data += `  <tr>
                                        <td scope="row">${element.episode_number}</td>
                                        <td>${element.name}</td>
                                        <td>${mydate2.toDateString()}</td>
                                      </tr>  
                                      
                                    
                    `
                                    }    
                                                                            
)
data+=`</tbody>
</table>
  </div>
</div>
</div>    `  
        console.log(data);

        var accordiontvepisodes = document.getElementById("accordion");
        accordiontvepisodes.insertAdjacentHTML("afterend",data);
        return;
    }
   

    function printData() {
        var data = ``;
        for (var i = 0; i <= moviesphoto.length; i++) {
            if (moviesphoto[i] != null) {
                if (moviesphoto[i].file_path !== undefined) {
                    var movieimage = moviesphoto[i].file_path;

                    data += `
                <div class="col-4 mb-3">
                <a href="https://image.tmdb.org/t/p/w500/${movieimage}" data-lightbox="example-set"><img class="w-100 " onclick="scrolltop()" onclient src="https://image.tmdb.org/t/p/w500/${movieimage}"></a>
                </div>
                `
                }
            }
        }
        var photogallery = document.getElementById("photossection");
        photogallery.innerHTML = data;
    }


    var currentPage;
    var numberPerPage = 5;
    var numberOfPages=1;   // calculates the
    var pageList = new Array(); 
    var url = new URL(window.location.href);

  
    if (url.searchParams.has('ID') && url.searchParams.has('type')) {
       
        const params = new URL(url).searchParams;
        var itemID = params.get('ID');
        var type = params.get('type');
        getDbItemByID(itemID, type);
        getReviews(itemID, type, numberPerPage, currentPage);
        var reviewscount = localStorage.getItem("reviewscount");
        getsimilarResult(itemID, type)
        getitemphotos(itemID, type);
        if(type=="tv")
        {
            getEpisodes(itemID);

        }     
    }
    else if (url.searchParams.has('query')) {
        const params = new URL(url).searchParams;
        var query = params.get('query');
        searchbyID(query)
    }
    else if (url.searchParams.has('title')) {
        var booktitle = document.getElementById("BookingMovieTitle");
        const params = new URL(url).searchParams;
        var movietitle = params.get('title');
        booktitle.innerHTML = movietitle
    }
    else {
        getMovies();
        getTrending();
        getTvseries();
        getCartoons();
        getCompnies();
        getTrending2();
    }


    $(".fa-search").on("click", function () {

        $(".seachdiv").slideToggle();
    })
    $(function () {
        'use strict'

        $('[data-toggle="offcanvas"]').on('click', function () {
            $('.offcanvas-collapse').toggleClass('open')
        })

        $('.navbar-nav>li>.nav-link').on('click', function () {
            $('#navbarsExampleDefault .offcanvas-collapse').toggleClass('open')
        })
    })
    $(".navbar-toggler").click(function () {
        $(this).toggleClass("collapsed");
    })

function displaypager(distinct,currentPage) {
    var pagerdata = `<ul class="pagination justify-content-center">`;
    var numberofpages = Math.floor(distinct.length/ 5);
    var result=numberofpages==0?true:false
    if(result)
    {
        $(".pagination-section").remove();
    }
    for (var i = 1; i <= numberofpages; i++) {
        if(i==currentPage)
        {
            pagerdata +=`<li class="page-item active"><a class="page-link" href="#/" onclick=navigate(${i})>${i}</a>`

        }
        else
        {
            pagerdata +=`<li class="page-item "><a class="page-link" href="#/" onclick=navigate(${i})>${i}</a>`
     
        }
    }
    pagerdata += `</ul>`;
    var pager = document.getElementById("pager");
    pager.innerHTML = pagerdata;
    
}
 /*Dalia api way testing*/
 function getReviews(itemID, type, numberPerPage, pagenumber) {
    var data;
    var Request = new XMLHttpRequest();
    Request.open('get', `https://api.themoviedb.org/3/${type}/${itemID}/reviews?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US`);
    Request.send()
    Request.onreadystatechange = function () {
        if (Request.readyState == 4 && Request.status == 200) {
            data = JSON.parse(Request.response).results    
            localStorage.setItem("eventsitems",JSON.stringify(data));

            numberOfPages = getNumberOfPages(data);

            if (pagenumber == null) {
                currentPage = 1;
            }
            else {
                currentPage = pagenumber;

            }
            var begin = ((currentPage - 1) * numberPerPage);
            var end = begin + numberPerPage;

            if(data.slice(begin,end).length==0)
            {
                $(".pagination-section").remove();
            }
    if (data.slice(begin, end).length > 0) {
        pageList = data.slice(begin, end);
        DisplayReviews(pageList)
        displaypager(data,currentPage)

    }
        }
    }
}
var searchResult = [];
async function searchbyID(query) {
    var data = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=28d102c23a94c950a5f83f4fd7517be8&language=en-US&query=${query}&include_adult=false`)
    var Response = await data.json();
    searchResult = Response.results;
    displaySearchResult();
}
var url2 = new URL(window.location.href);

function nextPage() {
    currentPage += 1;
    const params = new URL(url2).searchParams;
    var itemID = params.get('ID');
    var type = params.get('type');
    if(currentPage<numberOfPages)
    {
        getReviews(itemID,type,numberPerPage, currentPage);   
        $(".pagination  .page-item").removeClass("active");
        $(".pagination .page-item").eq(currentPage).addClass("active");
    }
}
function getNumberOfPages(data) {
    return Math.ceil(data.length / numberPerPage);
}
function previousPage() {
    currentPage -= 1;
    const params = new URL(url2).searchParams;
    var itemID = params.get('ID');
    var type = params.get('type');
    if(currentPage<numberOfPages)
{
    getReviews(itemID,type,numberPerPage, currentPage);

}
  
        }
        function navigate(index) {
            const params = new URL(url2).searchParams;
            var itemID = params.get('ID');
            var type = params.get('type');
            getReviews(itemID,type,numberPerPage, index);


        }
$('#owl-demo2').on('click', '.owl-item>div', function () {
    var moviename = $(this).children().eq(1).children().first().text();
    // $("#movieName").text(moviename);
    // $('#exampleModal').modal('show');
    window.location.href = "Booking.html?title=" + moviename;
})
const elements = document.querySelectorAll(['range-slider']);
elements.forEach(element => {
    element.insertAdjacentHTML('afterend', `
<output>5.5</output>
`);
});
$("range-slider").on("change", function (e) {
    const input = e.target;
    const output = input.nextElementSibling;
    if (output) {
        output.textContent = input.value;
    }

});
$('.seachinput').on("keypress", function (e) {
    var dInput = this.value;

    if (e.keyCode == 13) {
        window.location.href = "searchResult.html?query=" + dInput;
    }
});

$(".btnseach ").on("click",function(){
    var dInput = $(".seachinput").val();
    if(dInput !="")
    {
        window.location.href = "searchResult.html?query=" + dInput;
    }
})
function scrolltop()
{
    $("html, body").animate({ scrollTop: 0 }, "slow");

}

$(".ticketsubmit").on("click", function (e) {
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "This movie is 'A' rated and is for audiences above the age of 18. Please carry a valid photo ID/age proof to the theatre. No refund of tickets once bought.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept'

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'success!',
                'Your Seat has been Reserved.',
                'success'
            )
            setTimeout(function () {
                window.location.href = "./index.html"
            }, 3000)
        }
    })
})


