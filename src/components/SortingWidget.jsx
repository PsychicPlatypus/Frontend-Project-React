import { DropdownButton, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const SORTING = [
    { id: 1, name: "Title Ascending" },
    { id: 2, name: "Title Descending" },
    { id: 3, name: "Length Ascending" },
    { id: 4, name: "Length Descending" },
    { id: 5, name: "Date Ascending" },
    { id: 6, name: "Date Descending" },
];

export function SortingWidget({ func }) {
    return (
        <DropdownButton
            drop="up"
            align="end"
            variant="success"
            title={
                <span>
                    <FontAwesomeIcon icon={faList} />
                </span>
            }
            style={{
                position: "sticky",
                bottom: "0",
                padding: "0em 0.4em 1em",
                borderRadius: "50%",
                float: "right",
            }}
        >
            {SORTING.map((sorting) => (
                <Dropdown.Item key={sorting.id} eventKey="4.1">
                    <Nav.Link onClick={() => func(sorting.name)}>
                        {sorting.name}
                    </Nav.Link>
                </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4.2">Sorting</Dropdown.Item>
        </DropdownButton>
    );
}
