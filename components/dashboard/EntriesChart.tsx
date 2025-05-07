"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "iPhone 14 Pro",
    entries: 1245,
  },
  {
    name: "PS5 Bundle",
    entries: 987,
  },
  {
    name: "$500 Gift Card",
    entries: 0,
  },
  {
    name: "MacBook Pro",
    entries: 2341,
  },
  {
    name: "Vacation Package",
    entries: 567,
  },
  {
    name: "Gaming PC",
    entries: 0,
  },
]

export function EntriesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="entries" fill="#00B8A9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
