import { DropdownButton, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getAllCategories } from "../../data";

export function FilterWidget({ func }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then((data) => setCategories(data));
    }, []);

    return (
        <DropdownButton
            drop="up"
            align="end"
            variant="success"
            title={
                <span>
                    <FontAwesomeIcon icon={faFilter} />
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
            <Dropdown.Item eventKey="4.1">
                <Nav.Link onClick={() => func("All")}>All</Nav.Link>
            </Dropdown.Item>
            {categories.map((category) => (
                <Dropdown.Item key={category.id} eventKey="4.1">
                    <Nav.Link onClick={() => func(category.title)}>
                        {category.title}
                    </Nav.Link>
                </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4.2">Filter</Dropdown.Item>
        </DropdownButton>
    );
}
