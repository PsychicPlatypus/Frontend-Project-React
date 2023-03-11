import { useState, useEffect } from "react";
import { Card, Nav, Navbar } from "react-bootstrap";
import { getAllMovies, getAllCategories } from "../data.js";
import { Route, Routes } from "react-router-dom";
import { Movies } from "./Movies";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Navbar
                sticky="top"
                bg="dark"
                variant="dark"
                className="justify-content-center flex-wrap"
            >
                <Navbar.Brand href="#">Navbar</Navbar.Brand>
                <Nav.Item className="d-flex align-items-center btn btn-dark">
                    <Nav.Link href="/movies">Movies</Nav.Link>
                </Nav.Item>
                <Nav.Item className="d-flex align-items-center btn btn-dark">
                    <Nav.Link href="/other-movies">Other Movies</Nav.Link>
                </Nav.Item>
            </Navbar>
            <main>
                <Routes>
                    <Route path="/movies" element={<Movies />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
