import { useEffect, useState } from "react";
import { getSeatByAuditoriumId } from "../../data";
import { useStates } from "../utils/states";

export default function DisplayChairs({
    selectedScreening,
    auditoriumId,
    func,
}) {
    const [lock, setLock] = useState(false);
    const [seats_, setSeats_] = useState([]);
    const s = useStates({
        screening: selectedScreening,
        seats: [],
    });

    useEffect(() => {
        (async () => {
            let screening = selectedScreening;

            // Convert the string of occupied seats into an array of numbers
            screening.occupiedSeats = Array.isArray(
                selectedScreening.occupiedSeats
            )
                ? selectedScreening.occupiedSeats.map((x) => +x)
                : selectedScreening.occupiedSeats.split(",").map((x) => +x);

            // Set the state variable
            s.screening = screening;

            // Convert the data structure from an array of objects
            // to an array (rows) of arrays (seats in rows) of objects
            let rows = [];
            let row;
            let latestRow;

            for (let seat of seats_) {
                // Add a new property: Is the seat occupied? (true/false)
                seat.occupied = screening.occupiedSeats.includes(
                    seat.seatNumber
                );
                // Arrange seats into rows
                if (latestRow !== seat.rowNumber) {
                    row = [];
                    rows.push(row);
                }
                row.push(seat);
                latestRow = seat.rowNumber;
            }

            // Set the state variable
            s.seats = rows;
        })();
    }, [seats_]);

    useEffect(() => {
        getSeatByAuditoriumId(auditoriumId).then((seats) => {
            setSeats_(seats);
        });
    }, []);

    function toggleSeatSelection(seat) {
        // do nothing if occupied
        if (seat.occupied) {
            return;
        }
        // select if not selected, deselect if selected
        seat.selected = !seat.selected;
        func(seat.seatNumber);
        setLock(true);
    }

    // output the seats
    return s.seats.length === 0 ? null : (
        <div
            className="screening-and-seats"
            style={lock ? { pointerEvents: "none" } : { pointerEvents: "auto" }}
        >
            <div className="seats">
                {s.seats.map((row, i) => (
                    <>
                        <div className="row" key={i + "row"}>
                            {row.map((seat, i_) => (
                                <div
                                    className={
                                        (seat.selected ? "selected" : "") +
                                        (seat.occupied ? " occupied" : "")
                                    }
                                    onClick={() => toggleSeatSelection(seat)}
                                    key={i + "row" + i_ + "seat"}
                                >
                                    {seat.seatNumber}
                                </div>
                            ))}
                        </div>
                        <br />
                    </>
                ))}
            </div>
        </div>
    );
}
