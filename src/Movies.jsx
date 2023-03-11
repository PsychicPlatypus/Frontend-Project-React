import { Carousel, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllCategories, getAllMovies } from "../data";
import { MovieCard } from "./MovieCard";

export function Movies() {
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data));
    }, []);

    useEffect(() => {
        getAllCategories().then((data) => setCategories(data));
    }, []);

    console.log(movies.length > 0 ? movies[0].description.posterImage : "no");
    console.log(categories);
    return (
        <Container fluid={true} style={{ position: "relative" }}>
            <Row style={{ justifyContent: "center" }}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </Row>
        </Container>
    );
}
