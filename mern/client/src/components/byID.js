import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";

const House = (props) => (
  <tr>
    <td>{props.house.externalId}</td>
    <td>{props.house.areaSqm}</td>
    <td>{props.house.city}</td>
    <td>{props.house.latitude}</td>
    <td>{props.house.longitude}</td>
    <td>{props.house.postalCode}</td>
    <td>{props.house.rent}</td>
    <td>{props.house.title}</td>
    <td>{props.house.deposit}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.house.externalId}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteHouse(props.house.externalId);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

//This funciton provides the view for searching the houses by externalID
export default function ByID() {
  const [input, setInput] = useState("");

	//updates the list of houses when the user gives input
  const updateInput = async (input) => {
    setInput(input);
  };

  const [houses, setHouses] = useState([]);

  async function getHouses(input) {
    const response = await fetch(`http://localhost:6942/properties/${input}`);

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const newHouses = await response.json();
    setHouses(newHouses);
  }

  // This method fetches the houses from the database.
  useEffect(() => {
    getHouses(input);
    return;
  }, [input, houses]);

  // This method will delete a house
  async function deleteHouse(externalId) {
    console.log(externalId);
    await fetch(`http://localhost:6942/properties/${externalId}`, {
      method: "DELETE",
    });

    const newHouses = houses.filter((el) => el.externalId !== externalId);
    setHouses(newHouses);
  }

  // This method will map out the houses on the table
  function byID() {
    if (houses == null) {
      return;
    }

    try {
      return houses.map((house) => {
        return (
          <House
            house={house}
            deleteHouse={() => deleteHouse(house.externalId)}
            key={house.externalId}
          />
        );
      });
    } catch (err) {
      console.log(err);
      return (
        <House
          house={houses}
          deleteHouse={() => deleteHouse(houses.externalId)}
          key={houses.externalId}
        />
      );
    }
  }

  // This following section will display the table with the houses of individuals.
  return (
    <div>
      <h3>Search for property by externalId</h3>
      <SearchBar input={input} onChange={updateInput} value={"externalId"}/>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ExternalId</th>
            <th>AreaSqm</th>
            <th>City</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>PostalCode</th>
            <th>Rent</th>
            <th>Title</th>
            <th>Deposit</th>
          </tr>
        </thead>
        <tbody>{byID()}</tbody>
      </table>
    </div>
  );
}
