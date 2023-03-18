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
        console.log(booking);
        let totalPrice = 0;
        booking.tickets.forEach((ticket) => {
            totalPrice += ticket.price;
        });
        setTotalPrice(totalPrice);
        setBooking(booking);
        console.log(totalPrice);
        console.log(booking);
    }, []);

    console.log(totalPrice);
    console.log(booking);

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card bg="dark" text="white">
                <Card.Body>
                    <Card.Title>Receipt</Card.Title>
                    <Card.Text>Movie: {booking.movie.title}</Card.Text>
                    <Card.Text>Auditorium: {booking.auditorium}</Card.Text>
                    <Card.Text>
                        Screening Time: {booking.screeningTime}
                    </Card.Text>
                    <Card.Text>Total Price: {totalPrice} SEK</Card.Text>
                    <Button variant="outline-success" href="/">
                        Confirm
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
