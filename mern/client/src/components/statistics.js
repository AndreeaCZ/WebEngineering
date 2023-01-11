import React, { useEffect, useState } from "react";
import SearchBar from "./searchBar";

const House = (props) => (
	<tr>
        <td>{props.house.avgRent}</td>
        <td>{props.house.sdRent}</td>
        <td>{props.house.avgDep}</td>
        <td>{props.house.sdDep}</td>
	</tr>
);

//This function provides the view of house statistics by city
export default function Stats() {
    const [input, setInput] = useState("");
    
    //updates the list of houses when the user gives input
    const updateInput = async (input) => {
      setInput(input);
    };
  
    const [houses, setHouses] = useState([]);
  
    async function getHouses(input) {
      const response = await fetch(`http://localhost:6942/properties/statistics/${input}`);
  
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

    // This method will map out the houses on the table.
    function stats() {
      if (houses == null) {
        return;
      }
  
      try {
        return houses.map((house) => {
          return (
            <House
              house={house}
              houseStats={() => getHouses(house.city)}
              key={house.city}
            />
          );
        });
      } catch (err) {
        console.log(err);
        return (
          <House
            house={houses}
            houseStats={() => getHouses(houses.city)}
            key={houses.city}
          />
        );
      }
    }
  
    // This following section will display the table with the houses of individuals.
    return (
      <div>
        <h3>Display the statistics of a city's rent and deposit</h3>
        <br/>
	  		<i>Input city name with a capital letter (e.g. Groningen, not groningen)</i> 
        <br/>
        <SearchBar input={input} onChange={updateInput} value={"city"}/>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Mean Rent of City</th>
              <th>Standard Deviation of Rent of City</th>
              <th>Mean Deposit for City</th>
              <th>Standard Deviation of Deposit of City</th>
            </tr>
          </thead>
          <tbody>{stats()}</tbody>
        </table>
      </div>
    );
  }
  