"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function EmailImpactCalculator() {
  const [currentOpenRate, setCurrentOpenRate] = useState("")
  const [listSize, setListSize] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleCalculate = () => {
    if (currentOpenRate && listSize) {
      setShowResults(true)
    }
  }

  const currentRate = Number.parseFloat(currentOpenRate) || 0
  const subscribers = Number.parseInt(listSize.replace(/,/g, "")) || 0

  const improvedRate = Math.min(currentRate * 2, 100).toFixed(1)
  const additionalOpens = Math.floor((subscribers * (Number.parseFloat(improvedRate) - currentRate)) / 100)
  const percentIncrease =
    currentRate > 0 ? (((Number.parseFloat(improvedRate) - currentRate) / currentRate) * 100).toFixed(0) : "0"

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Email Impact Calculator</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <Label htmlFor="current-rate" className="text-white mb-1 block">
              Current Email Open Rate (%)
            </Label>
            <Input
              id="current-rate"
              type="number"
              min="0"
              max="100"
              placeholder="e.g. 15"
              value={currentOpenRate}
              onChange={(e) => setCurrentOpenRate(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="list-size" className="text-white mb-1 block">
              Email List Size
            </Label>
            <Input
              id="list-size"
              type="text"
              placeholder="e.g. 10000"
              value={listSize}
              onChange={(e) => {
                // Allow only numbers and commas
                const value = e.target.value.replace(/[^\d,]/g, "")
                setListSize(value)
              }}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <Button
            onClick={handleCalculate}
            disabled={!currentOpenRate || !listSize}
            className="w-full bg-accent hover:bg-accent/90 text-white"
          >
            Calculate Potential Impact
          </Button>
        </div>

        <div className="bg-white/10 rounded-lg p-5">
          {!showResults ? (
            <div className="h-full flex items-center justify-center text-white/70 text-center">
              <p>Enter your current email metrics to see how Raffily could improve your results</p>
            </div>
          ) : (
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Your Potential Results with Raffily</h4>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-white/80">Current Open Rate:</span>
                  <span className="text-white font-semibold">{currentRate}%</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-white/80">Potential Open Rate:</span>
                  <span className="text-accent font-semibold">{improvedRate}%</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-white/80">Improvement:</span>
                  <span className="text-accent font-semibold">+{percentIncrease}%</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-white/80">Additional Opens:</span>
                  <span className="text-accent font-semibold">+{additionalOpens.toLocaleString()}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 mt-4 border-t border-white/10 text-center"
                >
                  <p className="text-white font-medium mb-4">
                    See how businesses are doubling their email impact—Try Raffily now.
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white">Start Your Free Trial</Button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

