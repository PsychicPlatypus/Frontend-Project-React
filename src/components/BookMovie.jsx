import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
    Container,
    Form,
    Row,
    ToggleButton,
    Button,
    ButtonGroup,
    Card,
} from "react-bootstrap";
import {
    getMovieById,
    getOccupiedSeats,
    getAllAuditoriums,
    getAllTicketTypes,
} from "../../data";
import { generate } from "../utils/uid";
import DisplayChairs from "./DisplayChairs";
import { MovieCard } from "./MovieCard";

let OCCUPIEDSEATS;

export function BookMovie() {
    const [ticketTypes, setTicketTypes] = useState([
        { id: 0, name: "", price: 0 },
    ]);
    const [auditoriums, setAuditoriums] = useState([{ id: 0, name: "" }]);
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
        getAllAuditoriums().then((data) => setAuditoriums(data));
    }, []);

    useEffect(() => {
        getAllTicketTypes().then((data) => setTicketTypes(data));
    }, []);

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
            console.log("Seat selected: " + occupyChair);
            // Set the last tickets seatNumber to seat
            const lastTicket = bookedTickets[bookedTickets.length - 1];
            lastTicket.seatNumber = occupyChair;
            setBookedTickets(bookedTickets);
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
        <Container className="mb-5">
            <Row className="justify-content-center mb-5">
                {movie.length > 0 ? (
                    movie.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <h1>Loading...</h1>
                )}
            </Row>
            <Form id="form">
                <Form.Group controlId="formAuditorium">
                    <Form.Label>
                        <h2>Auditorium</h2>
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <ButtonGroup>
                        {auditoriums.map((auditorium_) => (
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
                                disabled={movie.length === 0}
                            >
                                {auditorium_.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Form.Group>

                <Form.Group id="form-section" hidden={auditorium.length === 0}>
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
                    id="form-section"
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
                                                auditoriums.find(
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
                            id="form-button"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    )}
                    <ButtonGroup>
                        {ticketTypes.map((ticketType) => (
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
                                href="#success"
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
                    id="form-section"
                    hidden={bookedTickets.length === 0}
                >
                    <Button
                        id="success"
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
                        href={`/receipt/${generate()}`}
                        disabled={chairPicked === false}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}
