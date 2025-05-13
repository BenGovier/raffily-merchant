import jsPDF from "jspdf"
import "jspdf-autotable"
import PptxGenJS from "pptxgenjs"

// Simplified report data structure
interface SimpleReportData {
  companyName: string
  dateRange: {
    start: string
    end: string
  }
  metrics: {
    totalEntries: number
    totalRevenue: number
    conversionRate: number
    views: number
  }
  raffles: Array<{
    name: string
    startDate: string
    endDate: string
    entries: number
    revenue: number
    conversion: number
    roi: number
  }>
}

// Generate a simple PDF report
export function generateSimplePDF(data: SimpleReportData): ArrayBuffer {
  try {
    // Create a new document
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(22)
    doc.setTextColor(45, 42, 74) // Deep navy
    doc.text("Raffle Performance Report", 105, 20, { align: "center" })

    // Add company name
    doc.setFontSize(16)
    doc.text(data.companyName, 105, 30, { align: "center" })

    // Add date range
    doc.setFontSize(12)
    doc.text(`${data.dateRange.start} - ${data.dateRange.end}`, 105, 40, { align: "center" })

    // Add metrics
    doc.setFontSize(14)
    doc.text("Performance Summary", 20, 60)

    doc.setFontSize(12)
    doc.text(`Total Entries: ${data.metrics.totalEntries.toLocaleString()}`, 20, 70)
    doc.text(`Total Revenue: $${data.metrics.totalRevenue.toLocaleString()}`, 20, 80)
    doc.text(`Conversion Rate: ${data.metrics.conversionRate.toFixed(2)}%`, 20, 90)
    doc.text(`Total Views: ${data.metrics.views.toLocaleString()}`, 20, 100)

    // Add table
    doc.setFontSize(14)
    doc.text("Raffle Campaign Performance", 20, 120)

    // Table headers and data
    const headers = [["Raffle", "Start Date", "End Date", "Entries", "Revenue", "Conv. %", "ROI %"]]
    const tableData = data.raffles.map((raffle) => [
      raffle.name,
      raffle.startDate,
      raffle.endDate,
      raffle.entries.toLocaleString(),
      `$${raffle.revenue.toLocaleString()}`,
      `${raffle.conversion.toFixed(2)}%`,
      `${raffle.roi.toFixed(2)}%`,
    ])

    // @ts-ignore - jspdf-autotable adds this method
    doc.autoTable({
      head: headers,
      body: tableData,
      startY: 130,
      theme: "grid",
      headStyles: {
        fillColor: [45, 42, 74],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    })

    // Return the PDF as an array buffer
    return doc.output("arraybuffer")
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw new Error(`PDF generation failed: ${error.message}`)
  }
}

// Generate a simple PowerPoint report
export function generateSimplePPTX(data: SimpleReportData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create a new presentation
      const pres = new PptxGenJS()

      // Add a slide
      const slide1 = pres.addSlide()

      // Add title
      slide1.addText("Raffle Performance Report", {
        x: 1,
        y: 1,
        w: 8,
        h: 1,
        fontSize: 24,
        color: "2D2A4A",
        bold: true,
        align: "center",
      })

      // Add company name
      slide1.addText(data.companyName, {
        x: 1,
        y: 2,
        w: 8,
        h: 0.5,
        fontSize: 18,
        color: "2D2A4A",
        align: "center",
      })

      // Add date range
      slide1.addText(`${data.dateRange.start} - ${data.dateRange.end}`, {
        x: 1,
        y: 2.5,
        w: 8,
        h: 0.5,
        fontSize: 14,
        color: "333333",
        align: "center",
      })

      // Add metrics
      slide1.addText("Performance Summary", {
        x: 1,
        y: 3.5,
        w: 8,
        h: 0.5,
        fontSize: 18,
        color: "2D2A4A",
        bold: true,
      })

      // Add metrics as text
      slide1.addText(
        [
          { text: `Total Entries: ${data.metrics.totalEntries.toLocaleString()}`, options: { fontSize: 14 } },
          { text: `Total Revenue: $${data.metrics.totalRevenue.toLocaleString()}`, options: { fontSize: 14 } },
          { text: `Conversion Rate: ${data.metrics.conversionRate.toFixed(2)}%`, options: { fontSize: 14 } },
          { text: `Total Views: ${data.metrics.views.toLocaleString()}`, options: { fontSize: 14 } },
        ],
        {
          x: 1,
          y: 4,
          w: 8,
          h: 2,
        },
      )

      // Add a second slide for the table
      const slide2 = pres.addSlide()

      // Add title
      slide2.addText("Raffle Campaign Performance", {
        x: 1,
        y: 0.5,
        w: 8,
        h: 0.5,
        fontSize: 24,
        color: "2D2A4A",
        bold: true,
      })

      // Create table data
      const tableData = [
        ["Raffle", "Start Date", "End Date", "Entries", "Revenue", "Conv. %", "ROI %"],
        ...data.raffles.map((raffle) => [
          raffle.name,
          raffle.startDate,
          raffle.endDate,
          raffle.entries.toLocaleString(),
          `$${raffle.revenue.toLocaleString()}`,
          `${raffle.conversion.toFixed(2)}%`,
          `${raffle.roi.toFixed(2)}%`,
        ]),
      ]

      // Add table
      slide2.addTable(tableData, {
        x: 0.5,
        y: 1.5,
        w: 9,
        colW: [2.5, 1.2, 1.2, 1, 1, 1, 1],
        fontSize: 12,
        color: "333333",
        border: { type: "solid", color: "2D2A4A", pt: 1 },
      })

      // Write to buffer and resolve
      pres
        .writeFile({ outputType: "nodebuffer" })
        .then((buffer) => {
          resolve(buffer)
        })
        .catch((error) => {
          reject(new Error(`PowerPoint generation failed: ${error.message}`))
        })
    } catch (error) {
      reject(new Error(`PowerPoint generation failed: ${error.message}`))
    }
  })
}

