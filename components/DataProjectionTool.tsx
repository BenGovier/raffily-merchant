"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowLeftRight } from "lucide-react"

const DataProjectionTool = () => {
  const [emailsSent, setEmailsSent] = useState(1000)
  const [frequency, setFrequency] = useState(1) // emails per raffle
  const [projectedData, setProjectedData] = useState({
    opens: 0,
    clicks: 0,
    engagedCustomers: 0,
    questionResponses: 0,
  })

  useEffect(() => {
    // Calculate projected data based on inputs
    const totalEmails = emailsSent * frequency
    const opens = Math.round(totalEmails * 0.08) // Changed from 0.22 to 0.08 (8%)
    const clicks = Math.round(opens * 0.15) // Changed to 15% of opens
    const engagedCustomers = Math.round(clicks * 0.05)
    const questionResponses = Math.round(clicks * 0.8)

    setProjectedData({
      opens,
      clicks,
      engagedCustomers,
      questionResponses,
    })
  }, [emailsSent, frequency])

  const chartData = [
    { name: "Opens", value: projectedData.opens },
    { name: "Clicks", value: projectedData.clicks },
    { name: "Engaged Customers", value: projectedData.engagedCustomers },
    { name: "Question Responses", value: projectedData.questionResponses },
  ]

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#1E0B36]">Data Projection Tool</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Customers in Raffle</h3>
          <div className="flex items-center mb-2">
            <ArrowLeftRight className="text-[#00B8A9] mr-2" />
            <p className="text-sm text-gray-600">Slide to adjust</p>
          </div>
          <Slider
            value={[emailsSent]}
            onValueChange={(value) => setEmailsSent(value[0])}
            min={1000}
            max={1000000}
            step={1000}
            className="mb-6"
          />
          <p className="text-lg font-medium">{emailsSent.toLocaleString()} customers</p>

          <h3 className="text-lg font-semibold mb-2 mt-6">Frequency You Email Your Customers per Raffle</h3>
          <div className="flex items-center mb-2">
            <ArrowLeftRight className="text-[#00B8A9] mr-2" />
            <p className="text-sm text-gray-600">Slide to adjust</p>
          </div>
          <Slider
            value={[frequency]}
            onValueChange={(value) => setFrequency(value[0])}
            min={1}
            max={30}
            step={1}
            className="mb-6"
          />
          <p className="text-lg font-medium">
            {frequency} email{frequency > 1 ? "s" : ""} per raffle
          </p>
        </div>

        <div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00B8A9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {Object.entries(projectedData).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#00B8A9]">{value.toLocaleString()}</p>
                <p className="text-sm text-gray-500">per raffle campaign</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-[#1E0B36] text-white rounded-lg">
        <h3 className="text-xl font-bold mb-2">Building Your Data Asset</h3>
        <p>
          With Raffily, every raffle campaign builds your valuable data asset. With this campaign, you could
          potentially:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>
            Engage with <strong>{projectedData.engagedCustomers.toLocaleString()}</strong> customers
          </li>
          <li>
            Collect <strong>{projectedData.questionResponses.toLocaleString()}</strong> customer insights from question
            responses
          </li>
          <li>
            Analyze engagement data from <strong>{projectedData.opens.toLocaleString()}</strong> email opens
          </li>
        </ul>
        <p className="mt-4">
          Imagine running this campaign multiple times a year, continuously growing your customer insights and
          engagement!
        </p>
      </div>
    </div>
  )
}

export default DataProjectionTool
