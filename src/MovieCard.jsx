import { Card } from "react-bootstrap";

export function MovieCard({ movie }) {
    /**
     * @property {
     *    id: number
     *    title: string
     *    description: {
     *      length: number
     *      categories: [string]
     *      posterImage: string
     *    }
     *  } Movie
     */

    return (
        <Card bg="dark" text="white" style={{ width: "18rem", margin: "1rem" }}>
            <Card.Img
                variant="top"
                src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`}
            />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description.length}</Card.Text>
            </Card.Body>
        </Card>
    );
}
