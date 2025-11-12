import React, { useEffect, useState } from "react";
import "./Reports.css";

function Reports() {
  const [sensorData, setSensorData] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const fetchSensorData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/thingspeak");
      const data = await res.json();
      setSensorData(data);
      generateAlerts(data);
    } catch (err) {
      console.error("Error fetching sensor data:", err);
    }
  };


  const generateAlerts = (data) => {
    const generatedAlerts = [];

    if (data.flowRate > 10) {
      generatedAlerts.push({
        id: 1,
        type: "CRITICAL",
        message: `High water flow detected (${data.flowRate} L/min)`,
        location: "Main Dispenser Line",
        time: "Just now",
      });
    } else if (data.flowRate < 2) {
      generatedAlerts.push({
        id: 2,
        type: "HIGH",
        message: `Low water flow detected (${data.flowRate} L/min)`,
        location: "Main Dispenser Line",
        time: "Just now",
      });
    }

    if (data.tankStatus === "FULL") {
      generatedAlerts.push({
        id: 3,
        type: "INFO",
        message: "Tank is currently full — overflow risk if inflow continues",
        location: "Central Tank",
        time: "Just now",
      });
    } else if (data.tankStatus === "LOW") {
      generatedAlerts.push({
        id: 4,
        type: "WARNING",
        message: "Tank water level is low — refill soon",
        location: "Central Tank",
        time: "Just now",
      });
    }

    setAlerts(generatedAlerts);
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 7000);
    return () => clearInterval(interval);
  }, []);

  const getBadgeClass = (type) => {
    switch (type) {
      case "CRITICAL":
        return "badge critical";
      case "HIGH":
        return "badge high";
      case "ERROR":
        return "badge error";
      case "WARNING":
        return "badge warning";
      case "INFO":
        return "badge info";
      default:
        return "badge";
    }
  };

  const handleAcknowledge = (id) => {
    alert("Acknowledged successfully!");
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDismiss = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="alerts-container">
      <h2 className="alerts-title">Active Alerts</h2>

      {alerts.length === 0 ? (
        <p className="no-alerts">✅ All systems are stable — No alerts right now.</p>
      ) : (
        alerts.map((alert) => (
          <div key={alert.id} className="alert-card-modern">
            <div className="alert-header">
              <span className={getBadgeClass(alert.type)}>{alert.type}</span>
              <span className="alert-time">{alert.time}</span>
            </div>
            <div className="alert-body">
              <p className="alert-message">{alert.message}</p>
              <p className="alert-location">{alert.location}</p>
            </div>
            <div className="alert-actions">
              <button className="btn outline" onClick={() => handleAcknowledge(alert.id)}>
                Acknowledge
              </button>
              <button className="btn solid" onClick={() => handleDismiss(alert.id)}>
                Dismiss
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Reports;
