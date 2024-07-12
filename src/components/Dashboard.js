import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import NavBar from "../components/common/NavBar";
import tickets from "../config/tickets"; // Importa los registros predefinidos

const Dashboard = () => {
  const [statusCounts, setStatusCounts] = useState({
    pendiente: 0,
    resuelto: 0,
  });
  const [selectedMunicipio, setSelectedMunicipio] = useState("Total");

  useEffect(() => {
    const filteredTickets = selectedMunicipio === "Total" ? tickets : tickets.filter((ticket) => ticket.municipio === selectedMunicipio);
    const pendiente = filteredTickets.filter((ticket) => ticket.status === "Pendiente").length;
    const resuelto = filteredTickets.filter((ticket) => ticket.status === "Resuelto").length;
    setStatusCounts({ pendiente, resuelto });
  }, [selectedMunicipio]);

  const data = [
    { name: "Pendiente", value: statusCounts.pendiente },
    { name: "Resuelto", value: statusCounts.resuelto },
  ];

  const COLORS = ["#FF8042", "#0088FE"];

  const municipios = ["Total", ...new Set(tickets.map(ticket => ticket.municipio))];

  return (
    <div className="container">
      <NavBar />
      <div className="card text-center">
        <div className="card-header">
          <h1>Dashboard</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <select
              onChange={(e) => setSelectedMunicipio(e.target.value)}
              className="form-select"
              value={selectedMunicipio}
            >
              {municipios.map((municipio) => (
                <option key={municipio} value={municipio}>
                  {municipio}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h3>Estatus de Tickets</h3>
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="col-md-6">
              <h3>Comparativa de Estatus</h3>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
