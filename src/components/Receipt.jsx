import { Button, Card, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export function Receipt() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [booking, setBooking] = useState({
        movie: {},
        auditorium: "",
        screeningTime: "",
        tickets: [],
        selectedScreening: {},
    });

    useEffect(() => {
        const booking = JSON.parse(localStorage.getItem("booking"));
        let totalPrice = 0;
        booking.tickets.forEach((ticket) => {
            totalPrice += ticket.price;
        });
        setTotalPrice(totalPrice);
        setBooking(booking);
    }, []);

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card bg="dark" text="white">
                <Card.Body>
                    <Card.Title>Receipt</Card.Title>
                    <Card.Text>
                        Booking Id: <br />{" "}
                        {window.location.href.split("/").pop()}
                    </Card.Text>
                    <Card.Text>Movie: {booking.movie.title}</Card.Text>
                    <Card.Text>Auditorium: {booking.auditorium}</Card.Text>
                    <Card.Text>
                        Screening Time:{" "}
                        {booking.screeningTime
                            .replace(/T/, " ")
                            .replace(/\..+/, "")}
                    </Card.Text>
                    <Card.Text>Total Price: {totalPrice} SEK</Card.Text>
                    <Card.Text>
                        Purchased Tickets:
                        {booking.tickets.map((ticket) => {
                            return (
                                <div>
                                    <Card.Text>
                                        Seat: {ticket.name}, No:{" "}
                                        {ticket.seatNumber}
                                        <br />
                                        Price: {ticket.price} SEK
                                    </Card.Text>
                                </div>
                            );
                        })}
                    </Card.Text>
                    <Button variant="outline-success" href="/">
                        Confirm
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
