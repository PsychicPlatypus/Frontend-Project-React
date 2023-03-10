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

export async function getMoviePoster(route) {
    const res = await fetch(`api${route}`);
    return await res.json();
}
