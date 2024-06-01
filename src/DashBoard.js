import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  
//   useEffect(() => {
//     // Load data (replace this with your actual data loading logic)
//     const fetchData = async () => {
//       const result = await axios('https://drive.google.com/file/d/1U9kbPoIturvwKNk0ZPGACirROId6j2or/view'); // Replace with actual URL
//       setData(result.data);
//     };
//     fetchData();
//   }, []);

  const processData = (data) => {
    const alertsOverTime = {};
    const alertsBySrcIp = {};
    const alertsByDestPort = {};
    const severityDistribution = {};

    data.forEach(alert => {
      const date = new Date(alert.timestamp).toLocaleDateString();
      alertsOverTime[date] = (alertsOverTime[date] || 0) + 1;
      alertsBySrcIp[alert.src_ip] = (alertsBySrcIp[alert.src_ip] || 0) + 1;
      alertsByDestPort[alert.dest_port] = (alertsByDestPort[alert.dest_port] || 0) + 1;
      severityDistribution[alert.alert.severity] = (severityDistribution[alert.alert.severity] || 0) + 1;
    });

    return { alertsOverTime, alertsBySrcIp, alertsByDestPort, severityDistribution };
  };

  const { alertsOverTime, alertsBySrcIp, alertsByDestPort, severityDistribution } = processData(data);

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Security Alerts Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Time Series of Alerts</h2>
          <Plot
            data={[
              {
                x: Object.keys(alertsOverTime),
                y: Object.values(alertsOverTime),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'cyan' },
              },
            ]}
            layout={{ title: 'Alerts Over Time', paper_bgcolor: 'black', plot_bgcolor: 'black', font: { color: 'white' } }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Alerts by Source IP</h2>
          <Plot
            data={[
              {
                x: Object.keys(alertsBySrcIp),
                y: Object.values(alertsBySrcIp),
                type: 'bar',
                marker: { color: 'cyan' },
              },
            ]}
            layout={{ title: 'Alerts by Source IP', paper_bgcolor: 'black', plot_bgcolor: 'black', font: { color: 'white' } }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Alerts by Destination Port</h2>
          <Plot
            data={[
              {
                x: Object.keys(alertsByDestPort),
                y: Object.values(alertsByDestPort),
                type: 'bar',
                marker: { color: 'cyan' },
              },
            ]}
            layout={{ title: 'Alerts by Destination Port', paper_bgcolor: 'black', plot_bgcolor: 'black', font: { color: 'white' } }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Severity Distribution</h2>
          <Plot
            data={[
              {
                values: Object.values(severityDistribution),
                labels: Object.keys(severityDistribution),
                type: 'pie',
                marker: { colors: ['red', 'orange', 'yellow'] },
              },
            ]}
            layout={{ title: 'Severity Distribution', paper_bgcolor: 'black', plot_bgcolor: 'black', font: { color: 'white' } }}
            useResizeHandler
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
