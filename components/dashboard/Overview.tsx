"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 120,
  },
  {
    name: "Feb",
    total: 180,
  },
  {
    name: "Mar",
    total: 240,
  },
  {
    name: "Apr",
    total: 280,
  },
  {
    name: "May",
    total: 320,
  },
  {
    name: "Jun",
    total: 450,
  },
  {
    name: "Jul",
    total: 380,
  },
  {
    name: "Aug",
    total: 430,
  },
  {
    name: "Sep",
    total: 510,
  },
  {
    name: "Oct",
    total: 470,
  },
  {
    name: "Nov",
    total: 520,
  },
  {
    name: "Dec",
    total: 580,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="#00B8A9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

