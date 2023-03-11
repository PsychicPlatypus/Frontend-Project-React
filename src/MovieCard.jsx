import { Card } from "react-bootstrap";
import { getScreenings } from "../data";
import { useState, useEffect } from "react";

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

    const [screening, setScreening] = useState({});

    useEffect(() => {
        getScreenings(movie.id).then((data) => setScreening(data));
    }, []);

    return (
        <Card bg="dark" text="white" id="base-card" position="relative">
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
                <Card.Footer
                    style={{
                        height: "2rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    <Card.Text>{Date(screening.time)}</Card.Text>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
}
