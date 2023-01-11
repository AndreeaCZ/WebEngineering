import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

//This function provides the view for editing an existing house
export default function Edit() {
  const [form, setForm] = useState({
    externalId: "",
    areaSqm: "",
    city: "",
    latitude: "",
    longitude: "",
    postalCode: "",
    rent: "",
    title: "",
    deposit: "",
    houses: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id;
      const response = await fetch(`http://localhost:6942/properties/${id}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const house = await response.json();
      if (!house) {
        window.alert(`House with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(house);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedHouse = {
      externalId: form.externalId,
      areaSqm: form.areaSqm,
      city: form.city,
      latitude: form.latitude,
      longitude: form.longitude,
      postalCode: form.postalCode,
      rent: form.rent,
      title: form.title,
      deposit: form.deposit,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:6942/properties/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(editedHouse),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update House</h3>
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
          <label htmlFor="longtitude">Longitude</label>
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
            value={form.name}
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

        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update House"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
