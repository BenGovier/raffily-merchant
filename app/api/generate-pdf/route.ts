import { NextResponse } from "next/server"
import jsPDF from "jspdf"
import "jspdf-autotable"

export async function POST(req: Request) {
  const data = await req.json()
  const { industry, currentOpenRate, companyName, industryAverage, raffilyRate, chartData } = data

  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text("Email Open Rate Report", 105, 15, { align: "center" })

  // Add company name if provided
  if (companyName) {
    doc.setFontSize(16)
    doc.text(`Prepared for: ${companyName}`, 105, 25, { align: "center" })
  }

  // Add statistics
  doc.setFontSize(12)
  doc.text(`Industry: ${industry}`, 20, 40)
  doc.text(`Current Open Rate: ${currentOpenRate}%`, 20, 50)
  doc.text(`Industry Average: ${industryAverage}%`, 20, 60)
  doc.text(`Projected Rate with Raffily: ${raffilyRate}%`, 20, 70)
  doc.text(`Potential Improvement: ${(Number(raffilyRate) - Number(currentOpenRate)).toFixed(2)}%`, 20, 80)

  // Add chart data as a table
  ;(doc as any).autoTable({
    head: [["Metric", "Rate"]],
    body: chartData.map((item) => [item.name, `${item.rate}%`]),
    startY: 90,
  })

  // Add why Raffily is right for you
  doc.text("Why Raffily is Right for You:", 20, 150)
  const benefits = [
    "Boost engagement with exciting raffle campaigns",
    "Collect valuable customer data and insights",
    "Increase email open rates and click-through rates",
    "Fully compliant with promotional regulations",
    "Easy to set up and integrate with your existing systems",
  ]
  benefits.forEach((benefit, index) => {
    doc.text(`• ${benefit}`, 25, 160 + index * 10)
  })

  // Add next steps
  doc.text("Next Steps:", 20, 220)
  doc.text("Ready to transform your email marketing strategy? Contact our team to", 20, 230)
  doc.text("schedule a demo and see how Raffily can help you achieve these results.", 20, 240)
  doc.text("Email: sales@raffily.com", 20, 255)
  doc.text("Phone: +1 (555) 123-4567", 20, 265)

  const pdfBuffer = doc.output("arraybuffer")

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=raffily_email_open_rate_report.pdf",
    },
  })
}

