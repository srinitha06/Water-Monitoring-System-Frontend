import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./OverallReport.css";

function OverallReport() {
  const [totalUsed, setTotalUsed] = useState(0);
  const [totalLeft, setTotalLeft] = useState(0);
  const [dispenserUsage, setDispenserUsage] = useState([]);
  const [monthlyUsage, setMonthlyUsage] = useState([]);
  const [loading, setLoading] = useState(true);


  const channelURL =
    "https://api.thingspeak.com/channels/3129473/feeds.json?api_key=PACOABSY0TLV6NDY&results=20";

  const fetchThinkSpeakData = async () => {
    try {
      const response = await fetch(channelURL);
      const data = await response.json();

      if (data && data.feeds && data.feeds.length > 0) {
        
        const feeds = data.feeds;

        const flowRates = feeds.map((feed) => parseFloat(feed.field1) || 0);
        const tankLevels = feeds.map((feed) => parseFloat(feed.field2) || 0);

    
        const totalFlow = flowRates.reduce((sum, val) => sum + val, 0);
        const totalLeftValue = tankLevels.length
          ? tankLevels[tankLevels.length - 1]
          : 0;

        setTotalUsed(totalFlow.toFixed(2));
        setTotalLeft(totalLeftValue.toFixed(2));
        const dispenserData = [
          { name: "Dispenser 1", used: flowRates[0] || 0 },
          { name: "Dispenser 2", used: flowRates[1] || 0 },
          { name: "Dispenser 3", used: flowRates[2] || 0 },
          { name: "Dispenser 4", used: flowRates[3] || 0 },
        ];
        setDispenserUsage(dispenserData);
        const monthlyData = feeds.map((feed, i) => ({
          month: `Read ${i + 1}`,
          used: parseFloat(feed.field1) || 0,
        }));
        setMonthlyUsage(monthlyData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching ThingSpeak data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThinkSpeakData();
    const interval = setInterval(fetchThinkSpeakData, 15000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="loading">Fetching live data...</p>;

  return (
    <div className="overall-container">
      <h2>Overall Water Report</h2>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Used</h3>
          <p>{totalUsed} Liters</p>
        </div>
        <div className="card">
          <h3>Tank Level</h3>
          <p>{totalLeft} Liters</p>
        </div>
      </div>
      <div className="chart-section">
        <h3>Dispenser-wise Usage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={dispenserUsage}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: "Liters", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="used" fill="#0077b6" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>


      <div className="chart-section">
        <h3>Recent Flow Readings</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyUsage}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: "Flow (L/min)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="used" fill="#d62828" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default OverallReport;
