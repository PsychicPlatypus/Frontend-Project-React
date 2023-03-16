import { MovieCard } from "./MovieCard";
import { getAllMovies, getMoviesWithSort } from "../data";
import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { SortingWidget } from "./SortingWidget";
import { FilterWidget } from "./FilterWidget";

export function MoviesAll() {
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sorting, setSorting] = useState("Date Ascending");

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data));
    }, []);

    useEffect(() => {
        if (selectedCategory === "All") {
            getAllMovies().then((data) => setMovies(data));
            return;
        }
        const filteredMovies = movies.filter((movie) => {
            const categories = movie.description.categories;
            return categories.some((category) => category === selectedCategory);
        });
        console.log(filteredMovies);
        setMovies(filteredMovies);
    }, [selectedCategory]);

    useEffect(() => {
        switch (sorting) {
            case "Title Ascending":
                console.log("Title Ascending");
                getMoviesWithSort("title").then((data) => setMovies(data));
                break;
            case "Title Descending":
                console.log("Title Descending");
                getMoviesWithSort("-title").then((data) => setMovies(data));
                break;
            case "Length Ascending":
                console.log("Length Ascending");
                getMoviesWithSort("length").then((data) => setMovies(data));
                break;
            case "Length Descending":
                console.log("Length Descending");
                getMoviesWithSort("-length").then((data) => setMovies(data));
                break;
            case "Date Ascending":
                console.log("Date Ascending");
                getMoviesWithSort("date").then((data) => setMovies(data));
                break;
            case "Date Descending":
                console.log("Date Descending");
                getMoviesWithSort("-date").then((data) => setMovies(data));
                break;
            default:
                break;
        }
        setSorting("");
    }, [sorting]);

    return (
        <Container fluid={true} style={{ position: "relative" }}>
            <Row style={{ justifyContent: "center" }}>
                {movies.length !== 0 ? (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            withScreenings={true}
                        />
                    ))
                ) : (
                    <h1>No movies found...</h1>
                )}
            </Row>

            {/* Filters */}
            <FilterWidget func={setSelectedCategory} />

            {/* Sort */}
            <SortingWidget func={setSorting} />
        </Container>
    );
}
