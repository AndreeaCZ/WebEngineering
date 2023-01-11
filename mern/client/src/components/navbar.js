import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img
            style={{ width: 25 + "%" }}
            //src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
            src="https://miro.medium.com/max/1400/1*40ZIPDSSUCQ8H5l-vrQoWw.jpeg"
          ></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create House
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/byID">
                Search by externalId
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/byLL">
                Search by lat and long
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/byBudget">
                Search by budget
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cityList">
                City lists
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/stats">
                City stats
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/report">
                Project report
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
