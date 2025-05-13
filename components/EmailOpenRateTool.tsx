"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Download, Upload, Loader } from "lucide-react"

const industryAverages = {
  Retail: 18.39,
  "E-commerce": 15.68,
  Hospitality: 21.52,
  "Financial Services": 24.11,
  Healthcare: 23.46,
  Education: 25.07,
  "Non-Profit": 25.96,
  Other: 21.33,
}

export default function EmailOpenRateTool() {
  const [industry, setIndustry] = useState("Retail")
  const [currentOpenRate, setCurrentOpenRate] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [logo, setLogo] = useState<string | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const industryAverage = industryAverages[industry]
  const raffilyRate = Math.min(Number.parseFloat(currentOpenRate) * 1.5, 100).toFixed(2)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generatePDF = async () => {
    setIsGeneratingPDF(true)
    setError(null)

    const chartData = [
      { name: "Your Current Rate", rate: Number.parseFloat(currentOpenRate) || 0 },
      { name: "Industry Average", rate: industryAverage },
      { name: "With Raffily", rate: Number.parseFloat(raffilyRate) },
    ]

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          industry,
          currentOpenRate,
          companyName,
          industryAverage,
          raffilyRate,
          chartData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = "raffily_email_open_rate_report.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Error generating PDF:", err)
      setError("An error occurred while generating the PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const chartData = [
    { name: "Your Current Rate", rate: Number.parseFloat(currentOpenRate) || 0 },
    { name: "Industry Average", rate: industryAverage },
    { name: "With Raffily", rate: Number.parseFloat(raffilyRate) },
  ]

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-accent">Email Open Rate Improvement Tool</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Industry</label>
            <Select onValueChange={setIndustry} defaultValue={industry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(industryAverages).map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Current Email Open Rate (%)</label>
            <Input
              type="number"
              value={currentOpenRate}
              onChange={(e) => setCurrentOpenRate(e.target.value)}
              placeholder="Enter your current open rate"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Logo (Optional)</label>
            <div className="flex items-center space-x-2">
              <Input type="file" onChange={handleLogoUpload} className="hidden" id="logo-upload" accept="image/*" />
              <Button asChild variant="outline">
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </label>
              </Button>
              {logo && <p className="text-sm text-green-600">Logo uploaded</p>}
            </div>
          </div>
          <Button
            onClick={generatePDF}
            className="w-full bg-accent hover:bg-accent/90 text-white"
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF Report
              </>
            )}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Email Open Rate Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rate" fill="#00B8A9" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="mt-4 space-y-2">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              Your current open rate: <strong>{currentOpenRate || "-"}%</strong>
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {industry} industry average: <strong>{industryAverage}%</strong>
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Projected rate with Raffily: <strong>{raffilyRate}%</strong>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-accent font-bold"
            >
              Potential improvement:{" "}
              <strong>
                {(Number.parseFloat(raffilyRate) - Number.parseFloat(currentOpenRate || "0")).toFixed(2)}%
              </strong>
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}
