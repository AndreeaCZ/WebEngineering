import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import HouseList from "./components/houseList";
import Edit from "./components/edit";
import Create from "./components/create";
import ByID from "./components/byID";
import ByLL from "./components/byLL";
import ByBudget from "./components/byBudget";
import CityList from "./components/cityList";
import UpdateList from "./components/updateList";
import Stats from "./components/statistics";
import Report from "./components/report"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HouseList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/byID" element={<ByID />} />
        <Route path="/byLL" element={<ByLL />} />
        <Route path="/byBudget" element={<ByBudget />} />
        <Route path="/cityList" element={<CityList />} />  
        <Route path="/updateList/:long/:lat" element={<UpdateList />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </div>
  );
};

export default App;
