"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts"

const data = [
  {
    name: "Email Entries",
    value: 65,
  },
  {
    name: "Purchase Entries",
    value: 25,
  },
  {
    name: "Social Media Entries",
    value: 10,
  },
]

const COLORS = ["#00B8A9", "#FD8E8E", "#FFCC21"]

export function ConversionChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

