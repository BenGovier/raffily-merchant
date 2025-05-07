"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubjectLineGenerator } from "@/components/marketing/SubjectLineGenerator"

export default function EmailMarketingPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Email Marketing</h1>
        <a href="/dashboard/marketing" className="ml-auto text-sm text-[#00B8A9] hover:underline">
          ← Back to Marketing Hub
        </a>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Subject Line Generator</CardTitle>
            <CardDescription>Generate attention-grabbing subject lines for your raffle emails</CardDescription>
          </CardHeader>
          <CardContent>
            <SubjectLineGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
