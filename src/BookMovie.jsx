// **Feature Flicks** would like to have a booking system where you can see a graphic view of the auditorium and its seats. You should be able to book a number of adjacent seats during a specific screening of a film.
// While booking, you should be able to choose the number of visitors and see the total price. When you complete a booking, you should receive a unique booking number, as well as be able to see which row(s) and seats you have booked.
// Note! Seniors (above the age of 65) and children (under the of 12) should have a lower ticket price. The normal ticket price is SEK 110, seniors SEK 85, children SEK 75.
// So far, you don’t need to be able to pay online - you pay when you arrive at the cinema and tell the staff your booking number.
// The seats are numbered from right to left, front to back. (The chair at the front right has the number 1. If the salon has 100 chairs, the one at the furthest back and to the left has the number 100.)
//

import { useState, useEffect } from "react";
import {
    Container,
    Form,
    Row,
    ToggleButton,
    Button,
    ButtonGroup,
} from "react-bootstrap";
import { getMovieById, getOccupiedSeats } from "../data";
import { MovieCard } from "./MovieCard";

const AUDITORIUMS = [
    {
        id: 2,
        name: "Lilla Salongen",
    },
    {
        id: 1,
        name: "Stora Salongen",
    },
];

const TICKETTYPES = [
    {
        id: 1,
        name: "Child",
        price: 65,
    },
    {
        id: 2,
        name: "Senior",
        price: 75,
    },
    {
        id: 3,
        name: "Adult",
        price: 85,
    },
];

export function BookMovie() {
    const [movie, setMovie] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [auditorium, setAuditorium] = useState("");
    const [movieBooking, setMovieBooking] = useState({
        screeningTime: "",
    });

    useEffect(() => {
        getMovieById(window.location.href.split("/").pop()).then((movie_) => {
            setMovie([movie_]);
            getOccupiedSeats(movie_.title).then((data) => {
                setOccupiedSeats(data);
            });
        });
    }, []);

    useEffect(() => {
        getOccupiedSeats(movie.title).then((data) => {
            data.filter((seat) => seat.auditorium === auditorium);
            setOccupiedSeats(data);
        });
    }, [auditorium]);

    console.log(occupiedSeats);

    return (
        <Container>
            <Row className="justify-content-center mb-5">
                {movie.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </Row>
            <Form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Form.Group controlId="formAuditorium">
                    <Form.Label>
                        <h2>Auditorium</h2>
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <ButtonGroup>
                        {AUDITORIUMS.map((auditorium_) => (
                            <ToggleButton
                                key={auditorium_.id}
                                type="radio"
                                variant="outline-light"
                                name="auditorium"
                                value={auditorium_.name}
                                checked={auditorium === auditorium_.name}
                                onClick={() => {
                                    setAuditorium(auditorium_.name);
                                }}
                            >
                                {auditorium_.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Form.Group>
                {auditorium && (
                    <Form.Group controlId="formScreeningDate">
                        <Form.Group>
                            <ButtonGroup>
                                {occupiedSeats.map((seat) => {
                                    <ToggleButton
                                        key={seat.screeningId}
                                        type="radio"
                                        variant="outline-light"
                                        name="screeningDate"
                                        value={seat.screeningTime}
                                        checked={
                                            movieBooking.screeningTime ===
                                            seat.screeningTime
                                        }
                                        onClick={() => {
                                            setMovieBooking({
                                                screeningTime:
                                                    seat.screeningTime,
                                            });
                                        }}
                                    >
                                        {seat.screeningTime}
                                    </ToggleButton>;
                                })}
                            </ButtonGroup>
                        </Form.Group>
                    </Form.Group>
                )}
            </Form>
        </Container>
    );
}
