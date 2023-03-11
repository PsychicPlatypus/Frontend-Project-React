import { Carousel, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllCategories, getAllMovies } from "../data";
import { MovieCard } from "./MovieCard";

export function MoviesCategories() {
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data));
    }, []);

    useEffect(() => {
        getAllCategories().then((data) => setCategories(data));
    }, []);

    return (
        <Container fluid={true} style={{ position: "relative" }} fade>
            {categories.map((category) => (
                <Row key={category.id} className="justify-content-center mb-5">
                    <h2>{category.title}</h2>
                    <Carousel
                        role="listbox"
                        indicators={false}
                        interval={null}
                        style={{ margin: "0 auto" }}
                    >
                        {
                            /** 3 cards for each carousel item */
                            movies
                                .filter((movie) =>
                                    movie.description.categories.includes(
                                        category.title
                                    )
                                )
                                .reduce((acc, movie, index) => {
                                    if (index % 3 === 0) {
                                        acc.push([]);
                                    }
                                    acc[acc.length - 1].push(movie);
                                    return acc;
                                }, [])
                                .map((movies, index) => (
                                    <Carousel.Item key={index}>
                                        <Row
                                            className="mx-auto justify-content-center"
                                            style={{ maxHeight: "32em" }}
                                        >
                                            {movies.map((movie) => (
                                                <MovieCard
                                                    key={movie.id}
                                                    movie={movie}
                                                />
                                            ))}
                                        </Row>
                                    </Carousel.Item>
                                ))
                        }
                    </Carousel>
                </Row>
            ))}
        </Container>
    );
}
