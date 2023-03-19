import { Card } from "react-bootstrap";

export function MovieCard({ movie, withScreenings }) {
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
        <Card
            bg="dark"
            text="white"
            id="base-card"
            position="relative"
            onClick={() => {
                window.location.href = `/book-movie/${movie.id}`;
            }}
        >
            <Card
                bg="dark"
                text="white"
                style={{
                    position: "absolute",
                    margin: "1.4em",
                    width: "25%",
                    opacity: "0.8",
                }}
            >
                {
                    // minutes to hours and minutes
                    ` ${
                        movie.description.length
                            ? `${Math.floor(movie.description.length / 60)}h ${
                                  movie.description.length % 60
                              }m`
                            : ""
                    } `
                }
            </Card>
            <Card.Body>
                <Card.Img
                    variant="top"
                    src={`https://cinema-rest.nodehill.se${movie.description.posterImage}`}
                    id="poster-image"
                />
                <Card.Title id="card-title">{movie.title}</Card.Title>

                {withScreenings && (
                    <Card.Footer
                        style={{
                            height: "2rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <Card.Text>
                            {movie.screenings.time
                                .replace(/T/, " ")
                                .replace(/\..+/, "")}
                        </Card.Text>
                    </Card.Footer>
                )}
            </Card.Body>
        </Card>
    );
}
