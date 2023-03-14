import { MovieCard } from "./MovieCard";
import {
    getAllMovies,
    getAllCategories,
    getMoviesWithSort,
    filterByCategory,
} from "../data";
import { Container, Row, DropdownButton, Dropdown, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faList } from "@fortawesome/free-solid-svg-icons";
import { SortingWidget } from "./SortingWidget";
import { FilterWidget } from "./FilterWidget";

const SORTING = [
    { id: 1, name: "Title Ascending" },
    { id: 2, name: "Title Descending" },
    { id: 3, name: "Length Ascending" },
    { id: 4, name: "Length Descending" },
    { id: 5, name: "Date Ascending" },
    { id: 6, name: "Date Descending" },
];

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
                        <MovieCard key={movie.id} movie={movie} />
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
