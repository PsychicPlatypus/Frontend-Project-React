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
    return await res.json();
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

export async function getScreenings(movieId) {
    /**
     * @type {MovieDate[]}
     * @description Fetches all movie dates from the API
     * @returns {Promise<MovieDate[]>}
     *
     * @property {
     * id: number
     * time: string
     * movieId: number
     * auditoriumId: number
     * } MovieDate
     */
    const res = await fetch(`api/screenings/${movieId}`);
    return await res.json();
}

getAllCategories();
