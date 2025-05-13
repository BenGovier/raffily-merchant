"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    date: "Jan 1",
    entries: 120,
    conversions: 24,
  },
  {
    date: "Jan 8",
    entries: 180,
    conversions: 36,
  },
  {
    date: "Jan 15",
    entries: 240,
    conversions: 48,
  },
  {
    date: "Jan 22",
    entries: 280,
    conversions: 56,
  },
  {
    date: "Jan 29",
    entries: 320,
    conversions: 64,
  },
  {
    date: "Feb 5",
    entries: 450,
    conversions: 90,
  },
  {
    date: "Feb 12",
    entries: 380,
    conversions: 76,
  },
  {
    date: "Feb 19",
    entries: 430,
    conversions: 86,
  },
  {
    date: "Feb 26",
    entries: 510,
    conversions: 102,
  },
  {
    date: "Mar 5",
    entries: 470,
    conversions: 94,
  },
  {
    date: "Mar 12",
    entries: 520,
    conversions: 104,
  },
  {
    date: "Mar 19",
    entries: 580,
    conversions: 116,
  },
]

export function AnalyticsOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="entries" stroke="#00B8A9" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="conversions" stroke="#FD8E8E" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

