import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import classes from "../../../styles/Dashboard.module.css";

const DashboardStats = ({
  activeReservationsAmount,
  activeIssuancesAmount,
  offLimitReservationsAmount,
}) => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);

  const data = [
    {
      name: "Izdate",
      uv: 4000,
      pv: 2400,
      Kolicina: activeIssuancesAmount,
    },
    {
      name: "Rezervisane",
      uv: 3000,
      pv: 1398,
      Kolicina: activeReservationsAmount,
    },
    {
      name: "U prekoracenju",
      uv: 2000,
      pv: 9800,
      Kolicina: offLimitReservationsAmount,
    },
  ];

  const navigate = useNavigate();

  const handleLabelClick = () => {
    navigate("/book-issuing");
  };

  return (
    <div>
      <div className={classes.sectionHeader}>
        <p>STATISTIKA KNJIGA</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              tick={(props) => (
                <g
                  onMouseEnter={() => setHoveredLabel(props.payload.value)}
                  onMouseLeave={() => setHoveredLabel(null)}
                  onClick={() => handleLabelClick(props.payload.value)}
                  transform={`translate(${props.x},${props.y + 10})`}
                >
                  <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill={
                      hoveredLabel === props.payload.value ? "#3f51b5" : "#666"
                    } // Change color on hover
                    transform="rotate(0)"
                    style={{
                      cursor: "pointer", // Change cursor on hover
                    }}
                  >
                    {props.payload.value}
                  </text>
                </g>
              )}
            />
            <YAxis dataKey="Kolicina" domain={[0, 80]} />
            <Tooltip />
            <Bar
              dataKey="Kolicina"
              barSize={50}
              label="10"
              onMouseEnter={(data, index) => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hoveredBar === index ? "#3f51b5" : "#4558be"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardStats;
