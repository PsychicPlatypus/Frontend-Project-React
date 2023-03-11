import { MovieCard } from "./MovieCard";
import { getAllMovies } from "../data";
import { Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

export function MoviesAll() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data));
    }, []);

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
