$(function () {
    $("#details-dialog").dialog({
        autoOpen: false,
        width: 500
    });
    $("#load-people").on("click", function () {
        loadPeople();
    });
    $("#load-films").on("click", function () {
        loadFilms();
    });

});
function loadPeople() {
    $("#people-spinner").show();
    $("#people-list").empty();
    $.ajax({
        url: "https://swapi.dev/api/people/",
        method: "GET",
        success: function (response) {
            $("#people-spinner").hide();
            displayPeople(response.results);
        },

        error: function () {
            $("#people-spinner").hide();
            alert("Error loading people from SWAPI.");
        }
    });
}function loadFilms() {
    $("#films-spinner").show();
    $("#films-list").empty();
    $.ajax({
        url: "https://swapi.dev/api/films/",
        method: "GET",
        success: function (response) {
            $("#films-spinner").hide();
            displayFilms(response.results);
        },
        error: function () {
            $("#films-spinner").hide();
            alert("Error loading films from SWAPI.");
        }
    });
}

function displayPeople(peopleArray) {
    peopleArray.forEach(function (person) {
        const $item = $("<li></li>")
            .addClass("list-group-item list-group-item-action")
            .text(person.name);
        $item.data("person", person);
        $item.on("click", function () {
            const selectedPerson = $(this).data("person");
            openPersonDialog(selectedPerson);
        });
        $("#people-list").append($item);
    });
}
function displayFilms(filmsArray) {
    filmsArray.forEach(function (film) {
        const $item = $("<li></li>")
            .addClass("list-group-item list-group-item-action")
            .text(film.title);
        $item.data("film", film);
        $item.on("click", function () {
            const selectedFilm = $(this).data("film");
            openFilmDialog(selectedFilm);
        });
        $("#films-list").append($item);
    });
}

function openPersonDialog(person) {
    const html = `
        <p><strong>Name:</strong> ${person.name}</p>
        <p><strong>Height:</strong> ${person.height} cm</p>
        <p><strong>Mass:</strong> ${person.mass} kg</p>
        <p><strong>Birth Year:</strong> ${person.birth_year}</p>
        <p><strong>Gender:</strong> ${person.gender}</p>
    `;
    $("#details-dialog").html(html);
    $("#details-dialog").dialog("open");
}
function openFilmDialog(film) {
    const html = `
        <p><strong>Title:</strong> ${film.title}</p>
        <p><strong>Episode:</strong> ${film.episode_id}</p>
        <p><strong>Director:</strong> ${film.director}</p>
        <p><strong>Producer:</strong> ${film.producer}</p>
        <p><strong>Release Date:</strong> ${film.release_date}</p>
        <p><strong>Opening Crawl:</strong></p>
        <div style="max-height: 150px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
        ${film.opening_crawl}
        </div>`;
    $("#details-dialog").html(html);
    $("#details-dialog").dialog("open");
}








