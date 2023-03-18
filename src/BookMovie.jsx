import { faX, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useReducer } from "react";
import {
    Container,
    Form,
    Row,
    ToggleButton,
    Button,
    ButtonGroup,
    Card,
} from "react-bootstrap";
import { getMovieById, getOccupiedSeats } from "../data";
import DisplayChairs from "./DisplayChairs";
import { MovieCard } from "./MovieCard";
let OCCUPIEDSEATS;

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
    // Bad practice, but it works
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [chairPicked, setChairPicked] = useState(true);
    const [occupyChair, setOccupyChair] = useState(0);
    const [auditorium, setAuditorium] = useState("");
    const [screeningTime, setScreeningTime] = useState("");
    const [movie, setMovie] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [bookedTickets, setBookedTickets] = useState([]);
    const [selectedScreening, setSelectedScreening] = useState({});
    const [addedTicket, setAddedTicket] = useState({
        index: 0,
        name: "default",
        price: 0,
    });

    useEffect(() => {
        getMovieById(window.location.href.split("/").pop()).then((movie_) => {
            setMovie([movie_]);
            getOccupiedSeats(movie_.title).then((data) => {
                setOccupiedSeats(data);
                OCCUPIEDSEATS = data;
            });
        });
    }, []);

    useEffect(() => {
        if (auditorium.length === 0) return;
        const filteredSeats = OCCUPIEDSEATS;
        setOccupiedSeats(
            filteredSeats.filter((seat) => seat.auditorium === auditorium)
        );
        resetTickets();
        setScreeningTime("");
    }, [auditorium]);

    useEffect(() => {
        if (screeningTime.length === 0) return;
        const filteredSeats = OCCUPIEDSEATS;

        setSelectedScreening(
            filteredSeats.filter(
                (seat) =>
                    seat.auditorium === auditorium &&
                    seat.screeningTime === screeningTime
            )[0]
        );
        resetTickets();
    }, [screeningTime]);

    useEffect(() => {
        if (addedTicket.name !== "default") {
            selectedScreening.occupied++;
            addedTicket.id = bookedTickets.length + 1;
            bookedTickets.push(addedTicket);
            setBookedTickets(bookedTickets);
            setAddedTicket({
                index: 0,
                name: "default",
                price: 0,
            });
            setChairPicked(false);
        }
    }, [addedTicket]);

    useEffect(() => {
        if (occupyChair !== 0) {
            const newOccupiedSeats =
                selectedScreening.occupiedSeats + ", " + occupyChair;

            selectedScreening.occupiedSeats = newOccupiedSeats;
            setOccupyChair(0);
            setChairPicked(true);
        }
    }, [occupyChair]);

    const resetTickets = () => {
        setBookedTickets([]);
        setAddedTicket({
            index: 0,
            name: "default",
            price: 0,
        });
    };

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
                                key={auditorium_.name}
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

                <Form.Group
                    style={{
                        marginTop: "2rem",
                    }}
                    hidden={auditorium.length === 0}
                >
                    <Form.Label>
                        <h3>Screening Times:</h3>
                    </Form.Label>
                    <br />
                    <ButtonGroup>
                        {auditorium.length > 0 &&
                            occupiedSeats.map((seat) => (
                                <ToggleButton
                                    key={seat.screeningTime}
                                    type="radio"
                                    variant="outline-light"
                                    name="screeningTime"
                                    value={seat.screeningTime}
                                    checked={
                                        screeningTime === seat.screeningTime
                                    }
                                    onClick={() => {
                                        setScreeningTime(seat.screeningTime);
                                    }}
                                >
                                    {seat.screeningTime
                                        .replace(/T/, " ")
                                        .replace(/\..+/, "")}
                                </ToggleButton>
                            ))}
                    </ButtonGroup>
                </Form.Group>

                <Form.Group
                    style={{
                        marginTop: "2rem",
                    }}
                    hidden={screeningTime.length === 0}
                >
                    <Form.Label>
                        <h3>
                            Add Tickets, Available Amount:{" "}
                            {selectedScreening.total -
                                selectedScreening.occupied}
                        </h3>
                    </Form.Label>
                    <Row>
                        {bookedTickets.map((ticket, index) => (
                            <Card key={index} bg="dark" text="white">
                                <Card.Body>
                                    <Card.Header>
                                        {ticket.name +
                                            " | " +
                                            ticket.price +
                                            "kr"}
                                    </Card.Header>
                                    <Card.Footer>
                                        <Card.Text> Select Seat: </Card.Text>
                                        <DisplayChairs
                                            auditoriumId={
                                                AUDITORIUMS.find(
                                                    (auditorium_) =>
                                                        auditorium_.name ===
                                                        auditorium
                                                ).id
                                            }
                                            selectedScreening={
                                                selectedScreening
                                            }
                                            func={setOccupyChair}
                                        />
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        ))}
                    </Row>

                    {bookedTickets.length !== 0 && (
                        <Button
                            variant="outline-light"
                            onClick={() => window.location.reload(-1)}
                            style={{ marginRight: "1em" }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    )}
                    <ButtonGroup>
                        {TICKETTYPES.map((ticketType) => (
                            <Button
                                key={ticketType.price}
                                variant="outline-light"
                                onClick={() => setAddedTicket(ticketType)}
                                disabled={
                                    (selectedScreening.total -
                                        selectedScreening.occupied ===
                                        0) |
                                    (chairPicked === false)
                                }
                            >
                                {ticketType.name +
                                    " | " +
                                    ticketType.price +
                                    "kr"}
                            </Button>
                        ))}
                        <br />
                    </ButtonGroup>
                </Form.Group>
                <Form.Group
                    style={{
                        marginTop: "2rem",
                    }}
                    hidden={bookedTickets.length === 0}
                >
                    <Button
                        variant="outline-success"
                        // onClick add to localstorage
                        onClick={() => {
                            localStorage.setItem(
                                "booking",
                                JSON.stringify({
                                    movie: movie[0],
                                    auditorium: auditorium,
                                    screeningTime: screeningTime,
                                    tickets: bookedTickets,
                                    selectedScreening: selectedScreening,
                                })
                            );
                        }}
                        href="/receipt"
                        disabled={chairPicked === false}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}
