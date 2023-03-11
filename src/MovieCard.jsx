import { Card } from "react-bootstrap";

export function MovieCard({ movie, category }) {
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
        <Card bg="dark" text="white" id="base-card">
            <Card.Body>
                <Card.Img
                    variant="top"
                    src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`}
                    id="poster-image"
                />
                <Card.Title id="card-title">{movie.title}</Card.Title>
                <Card.Footer
                    style={{
                        height: "2rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    <Card.Text>
                        {movie.description.categories.join(", ")}
                    </Card.Text>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
}
