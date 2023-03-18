export async function getSeatByAuditoriumId(auditoriumId) {
    const res = await fetch(
        `/api/seats/?auditoriumId=${auditoriumId}&sort=seatNumber`
    );
    return await res.json();
}

export async function getAllMovies() {
    /**
     * @type {Movie[]}
     * @description Fetches all movies from the API
     * @returns {Promise<Movie[]>}

     * @property {
     *    id: number
     *    title: string
     *    description: {
     *      length: number
     *      categories: [string]
     *      posterImage: string
     *    }
     *  } Movie
     */
    const res = await fetch("api/movies");
    const movies = await res.json();
    const screenings = await getAllScreenings();

    movies.reduce((acc, movie) => {
        movie.screenings = screenings.filter(
            (screening) => screening.movieId === movie.id
        )[0];
        return acc;
    }, []);
    return movies;
}

export async function getMovieById(movieId) {
    const res = await fetch(`/api/movies/${movieId}`);
    const data = await res.json();
    return data;
}

export async function getMoviesWithSort(sort) {
    /**
     * @type {Movie[]}
     * @description Fetches all movies from the API
     * @returns {Promise<Movie[]>}

     * @property {
     *    id: number
     *    title: string
     *    description: {
     *      length: number
     *      categories: [string]
     *      posterImage: string
     *    }
     *  } Movie
     */
    if (["title", "-title"].includes(sort)) {
        const res = await fetch(`api/movies?sort=${sort}`);
        const movies = await res.json();
        const screenings = await getAllScreenings();

        movies.reduce((acc, movie) => {
            movie.screenings = screenings.filter(
                (screening) => screening.movieId === movie.id
            )[0];
            return acc;
        }, []);
        return movies;
    }
    const res = await fetch("api/movies");
    const movies = await res.json();
    const screenings = await getAllScreenings();

    movies.reduce((acc, movie) => {
        movie.screenings = screenings.filter(
            (screening) => screening.movieId === movie.id
        )[0];
        return acc;
    }, []);

    switch (sort) {
        case "length":
            return movies.sort(
                (a, b) => a.description.length - b.description.length
            );
        case "-length":
            return movies.sort(
                (a, b) => b.description.length - a.description.length
            );
        case "date":
            return movies.sort(
                (a, b) =>
                    Date.parse(a.screenings.time) -
                    Date.parse(b.screenings.time)
            );
        case "-date":
            return movies.sort(
                (a, b) =>
                    Date.parse(b.screenings.time) -
                    Date.parse(a.screenings.time)
            );
        default:
            return movies;
    }
}

export async function getTicketTypes() {
    /**
     * @type {TicketType[]}
     * @description Fetches all ticket types from the API
     * @returns {Promise<TicketType[]>}

     * @property {
     *   id: number
     *   name: string
     *   price: number
     * } TicketType
     */
    const res = await fetch("api/ticketTypes");
    return await res.json();
}

export async function getAllCategories() {
    /**
     * @type {Category[]}
     * @description Fetches all categories from the API
     * @returns {Promise<Category[]>}

     * @property {
     * id: number
     * title: string
     * description: string
     * } Category
     */
    const res = await fetch("api/categories");
    return await res.json();
}

async function getAllScreenings() {
    /**
     * @type {MovieDate[]}
     * @description Fetches all movie dates from the API
     * @returns {Promise<MovieDate[]>}

     * @property {
     * id: number
     * time: string
     * movieId: number
     * auditoriumId: number
     * } MovieDate
     */
    const res = await fetch("api/screenings");
    return await res.json();
}

export async function getOccupiedSeats(movieName) {
    /**
     * @property {
     * screeningId: number
     * screeningTime: string
     * movie: string
     * auditorium: string
     * occupiedSeats: string
     * occupied: number
     * total: number
     * occupiedPercent: string
     * } OccupiedSeats
     */

    const res = await fetch(`/api/occupied_seats?movie=${movieName}`);
    return await res.json();
}
