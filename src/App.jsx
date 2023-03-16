import { Nav, Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { MoviesCategories } from "./MoviesCategories";
import { MoviesAll } from "./MoviesAll";

import "./MovieCard.css";
import "./App.css";
import { BookMovie } from "./BookMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function App() {
    return (
        <div className="App">
            <Navbar
                sticky="top"
                bg="dark"
                variant="dark"
                className="justify-content-center flex-wrap"
            >
                <Navbar.Brand href="#">
                    <FontAwesomeIcon icon={faFilm} />
                    <span className="ms-2">Cinema</span>
                </Navbar.Brand>
                <Nav.Item className="d-flex align-items-center btn btn-dark">
                    <Nav.Link href="/movies-categories">
                        Movies By Categories
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-flex align-items-center btn btn-dark">
                    <Nav.Link href="/movies-all">All Movies</Nav.Link>
                </Nav.Item>
            </Navbar>
            <main>
                <Routes>
                    <Route path="/" element={<MoviesCategories />} />
                    <Route
                        path="/movies-categories"
                        element={<MoviesCategories />}
                    />
                    <Route path="/movies-all" element={<MoviesAll />} />
                    <Route path="/book-movie/:id" element={<BookMovie />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
