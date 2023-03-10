import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { getAllMovies, getMoviePoster } from "../data.js";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies().then((data) => setMovies(data));
    }, []);

    console.log(movies);

    return (
        <div className="App">
            <h1>Movie List</h1>

            <div className="movies">
                {movies.map((movie) => (
                    <Card key={movie.id} style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default App;
