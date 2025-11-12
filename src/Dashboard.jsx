import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const [sensorData, setSensorData] = useState({
    flowRate: 0,
    tankStatus: "UNKNOWN",
    rainStatus: "No Rain",
    relayState: "OFF",
    timestamp: "",
  });

  const [dispensers, setDispensers] = useState([]);
  const [newDispenser, setNewDispenser] = useState({
    location: "",
    status: "Active",
  });


  const fetchSensorData = async () => {
    try {
      const res = await fetch("https://water-monitoring-system-ox6o.onrender.com/api/thingspeak");
      const data = await res.json();
      setSensorData(data);
    } catch (err) {
      console.error("Error fetching sensor data:", err);
    }
  };

 
  const fetchDispensers = async () => {
    try {
      const res = await fetch("https://water-monitoring-system-ox6o.onrender.com/api/dispensers");
      const data = await res.json();
      setDispensers(data);
    } catch (err) {
      console.error("Error fetching dispensers:", err);
    }
  };

 
  const handleAddDispenser = async (e) => {
    e.preventDefault();
    if (!newDispenser.location) return alert("Enter dispenser location!");
    try {
      const res = await fetch("https://water-monitoring-system-ox6o.onrender.com/api/dispensers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDispenser),
      });
      if (res.ok) {
        setNewDispenser({ location: "", status: "Active" });
        fetchDispensers();
      }
    } catch (err) {
      console.error("Error adding dispenser:", err);
    }
  };

 
  const handleDeleteDispenser = async (id) => {
    if (!window.confirm("Delete this dispenser?")) return;
    try {
      const res = await fetch(`https://water-monitoring-system-ox6o.onrender.com/api/dispensers/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchDispensers();
    } catch (err) {
      console.error("Error deleting dispenser:", err);
    }
  };

  useEffect(() => {
    fetchSensorData();
    fetchDispensers();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  const total = dispensers.length;
  const active = dispensers.filter((d) => d.status === "Active").length;
  const maintenance = dispensers.filter((d) => d.status === "Maintenance").length;

  return (
    <div className="dashboard-container">
      
      <h2 className="section-title">📊 Dispenser Overview</h2>
      <div className="overview-row">
        <div className="overview-card total">
          <h2>Total Dispensers</h2>
          <h1>{total}</h1>
        </div>
        <div className="overview-card active">
          <h2>Active</h2>
          <h1>{active}</h1>
        </div>
        <div className="overview-card maintenance">
          <h2>Maintenance</h2>
          <h1>{maintenance}</h1>
        </div>
      </div>

     
      <div className="main-section">
       
        <div className="dispensers-section">
          <h2 className="side-heading">🧩 Dispenser Details</h2>
          <div className="dispensers-grid">
            {dispensers.length === 0 ? (
              <p>No dispensers available.</p>
            ) : (
              dispensers.map((disp) => (
                <div
                  key={disp._id}
                  className={`dispenser-card ${
                    disp.status === "Active" ? "active-card" : "maintenance-card"
                  }`}
                >
                  <div className="dispenser-header">
                    <h3>{disp.location}</h3>
                    <div
                      className={`status-circle ${
                        disp.status === "Active" ? "green" : "yellow"
                      }`}
                      title={disp.status}
                    ></div>
                  </div>

                  <div className="sensor-info">
                    <p>
                      <strong>Flow Rate:</strong> {sensorData.flowRate} L/min
                    </p>
                    <p>
                      <strong>Tank Status:</strong> {sensorData.tankStatus}
                    </p>
                    <p>
                      <strong>Rain Status:</strong> {sensorData.rainStatus}
                    </p>
                    <p>
                      <strong>Relay:</strong> {sensorData.relayState}
                    </p>
                    <small>
                      Updated:{" "}
                      {sensorData.timestamp
                        ? new Date(sensorData.timestamp).toLocaleString()
                        : "N/A"}
                    </small>
                  </div>

                  <div className="delete-section">
                    <FaTrashAlt
                      size={20}
                      color="red"
                      className="delete-icon"
                      onClick={() => handleDeleteDispenser(disp._id)}
                      title="Delete dispenser"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

       
        <div className="add-dispenser-form">
          <h2 className="side-heading">➕ Add Dispenser</h2>
          <form onSubmit={handleAddDispenser}>
            <input
              type="text"
              placeholder="Enter Location"
              value={newDispenser.location}
              onChange={(e) =>
                setNewDispenser({ ...newDispenser, location: e.target.value })
              }
              required
            />
            <select
              value={newDispenser.status}
              onChange={(e) =>
                setNewDispenser({ ...newDispenser, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
