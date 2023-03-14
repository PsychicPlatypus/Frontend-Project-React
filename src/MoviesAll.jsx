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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sorting, setSorting] = useState("Date Ascending");

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data));
    }, []);

    useEffect(() => {
        getAllCategories().then((data) => setCategories(data));
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
            <DropdownButton
                drop="up"
                align="end"
                variant="success"
                title={
                    <span>
                        <FontAwesomeIcon icon={faFilter} />
                    </span>
                }
                style={{
                    position: "sticky",
                    bottom: "0",
                    padding: "0em 0.4em 1em",
                    borderRadius: "50%",
                    float: "right",
                }}
            >
                <Dropdown.Item eventKey="4.1">
                    <Nav.Link onClick={() => setSelectedCategory("All")}>
                        All
                    </Nav.Link>
                </Dropdown.Item>
                {categories.map((category) => (
                    <Dropdown.Item key={category.id} eventKey="4.1">
                        <Nav.Link
                            onClick={() => setSelectedCategory(category.title)}
                        >
                            {category.title}
                        </Nav.Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4.2">Filters</Dropdown.Item>
            </DropdownButton>

            {/* Sort */}
            <DropdownButton
                drop="up"
                align="end"
                variant="success"
                title={
                    <span>
                        <FontAwesomeIcon icon={faList} />
                    </span>
                }
                style={{
                    position: "sticky",
                    bottom: "0",
                    padding: "0em 0.4em 1em",
                    borderRadius: "50%",
                    float: "right",
                }}
            >
                {SORTING.map((sorting) => (
                    <Dropdown.Item key={sorting.id} eventKey="4.1">
                        <Nav.Link onClick={() => setSorting(sorting.name)}>
                            {sorting.name}
                        </Nav.Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4.2">Sorting</Dropdown.Item>
            </DropdownButton>
        </Container>
    );
}
