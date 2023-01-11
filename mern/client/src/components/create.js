import React, { useState } from "react";
import { useNavigate } from "react-router";

//This funciton provides the view for adding a new house
export default function Create() {
  const [form, setForm] = useState({
    externalId: "",
    areaSqm: 0,
    city: "",
    latitude: "",
    longitude: "",
    postalCode: "",
    rent: 0,
    title: "",
    deposit: 0,
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newHouse = { ...form };

    await fetch(`http://localhost:6942/properties/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHouse),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      externalId: "",
      areaSqm: 0,
      city: "",
      latitude: "",
      longitude: "",
      postalCode: "",
      rent: 0,
      title: "",
      deposit: 0,
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New House</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="externalId">ExternalId</label>
          <input
            type="text"
            className="form-control"
            id="externalId"
            value={form.externalId}
            onChange={(e) => updateForm({ externalId: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="areaSqm">AreaSqm</label>
          <input
            type="number"
            className="form-control"
            id="areaSqm"
            value={form.areaSqm}
            onChange={(e) => updateForm({ areaSqm: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={form.city}
            onChange={(e) => updateForm({ city: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            className="form-control"
            id="latitude"
            value={form.latitude}
            onChange={(e) => updateForm({ latitude: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            className="form-control"
            id="longitude"
            value={form.longitude}
            onChange={(e) => updateForm({ longitude: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">PostalCode</label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            value={form.postalCode}
            onChange={(e) => updateForm({ postalCode: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rent">Rent</label>
          <input
            type="number"
            className="form-control"
            id="rent"
            value={form.rent}
            onChange={(e) => updateForm({ rent: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label><br/>
          <input
            type="text"
            className="from-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deposit">Deposit</label>
          <input
            type="number"
            className="form-control"
            id="deposit"
            value={form.deposit}
            onChange={(e) => updateForm({ deposit: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create house"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
