import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

//This function provides the view of all the houses in the database
export default function HouseList() {
  const [houses, setHouses] = useState([]);

  // This method fetches the houses from the database.
  useEffect(() => {
    async function getHouses() {
      const response = await fetch(`http://localhost:6942/properties/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const houses = await response.json();
      setHouses(houses);
    }

    getHouses();

    return;
  }, [houses]);

  // This method will delete a house
  async function deleteHouse(externalId) {
    await fetch(`http://localhost:6942/properties/${externalId}`, {
      method: "DELETE",
    });

    const result = await fetch(`http://localhost:6942/properties/`);
    const newHouses = await result.json();
    setHouses(newHouses);
  }

  // This method will map out the houses on the table
  function houseList() {
    return houses.map((house) => {
      return (
        <House
          house={house}
          deleteHouse={() => deleteHouse(house.externalId)}
          key={house.externalId}
        />
      );
    });
  }

  // This following section will display the table with the houses of individuals.
  return (
    <div>
      <h3>House List</h3>
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
        <tbody>{houseList()}</tbody>
      </table>
    </div>
  );
}
