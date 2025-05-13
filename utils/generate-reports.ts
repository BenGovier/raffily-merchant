import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import PptxGenJS from "pptxgenjs"
import { format } from "date-fns"

// Define types for our report data
interface ReportData {
  companyName: string
  companyLogo?: string // Base64 or URL of the logo
  dateRange: {
    start: Date
    end: Date
  }
  metrics: {
    totalEntries: number
    totalRevenue: number
    conversionRate: number
    views: number
    clicks: number
    shares: number
  }
  revenueData: Array<{
    date: string
    value: number
  }>
  engagementData: Array<{
    date: string
    views: number
    clicks: number
    shares: number
  }>
  raffleData: Array<{
    name: string
    startDate: Date
    endDate: Date
    entries: number
    revenue: number
    conversion: number
    roi: number
  }>
}

// Colors used across both formats
const colors = {
  primary: "#2D2A4A", // Deep navy
  secondary: "#00B8A9", // Teal accent
  tertiary: "#FF4D8D", // Pink accent
  text: "#333333",
  lightGray: "#F5F5F5",
}

export async function generatePDF(data: ReportData): Promise<Uint8Array> {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Cover page
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, 210, 297, "F")

  // Add logo if available
  if (data.companyLogo) {
    try {
      doc.addImage(
        data.companyLogo,
        "PNG",
        105 - 30, // Center the logo
        50,
        60,
        60,
      )
    } catch (error) {
      console.error("Error adding logo to PDF:", error)
    }
  }

  // Title
  doc.setFont("helvetica", "bold")
  doc.setFontSize(24)
  doc.setTextColor(colors.primary)
  doc.text("Raffle Performance Report", 105, 140, { align: "center" })

  // Company name and date range
  doc.setFontSize(16)
  doc.text(data.companyName, 105, 160, { align: "center" })

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(
    `${format(data.dateRange.start, "MMMM d, yyyy")} - ${format(data.dateRange.end, "MMMM d, yyyy")}`,
    105,
    175,
    { align: "center" },
  )

  doc.text(`Generated on: ${format(new Date(), "MMMM d, yyyy")}`, 105, 185, { align: "center" })

  // Add page number
  const totalPages = 4 // Estimate
  doc.setFontSize(10)
  doc.text(`Page 1 of ${totalPages}`, 105, 280, { align: "center" })

  // Summary page
  doc.addPage()

  // Header
  doc.setFillColor(colors.primary)
  doc.rect(0, 0, 210, 15, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.text("Raffle Performance Report", 10, 10)
  doc.text(data.companyName, 200, 10, { align: "right" })

  // Page title
  doc.setTextColor(colors.primary)
  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text("Performance Summary", 105, 30, { align: "center" })

  // Metrics boxes
  const metrics = [
    { title: "Total Entries", value: data.metrics.totalEntries.toLocaleString() },
    { title: "Total Revenue", value: `$${data.metrics.totalRevenue.toLocaleString()}` },
    { title: "Conversion Rate", value: `${data.metrics.conversionRate.toFixed(2)}%` },
    { title: "Total Views", value: data.metrics.views.toLocaleString() },
  ]

  metrics.forEach((metric, index) => {
    const x = 20 + (index % 2) * 90
    const y = 50 + Math.floor(index / 2) * 40

    // Box
    doc.setFillColor(255, 255, 255)
    doc.setDrawColor(colors.primary)
    doc.roundedRect(x, y, 80, 30, 3, 3, "FD")

    // Title
    doc.setTextColor(colors.primary)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(metric.title, x + 5, y + 10)

    // Value
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(metric.value, x + 5, y + 25)
  })

  // Raffle data table
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Raffle Campaign Performance", 105, 140, { align: "center" })

  // Table headers and data
  const tableHeaders = ["Raffle Name", "Start Date", "End Date", "Entries", "Revenue", "Conv. %", "ROI %"]
  const tableData = data.raffleData.map((raffle) => [
    raffle.name,
    format(raffle.startDate, "MM/dd/yyyy"),
    format(raffle.endDate, "MM/dd/yyyy"),
    raffle.entries.toLocaleString(),
    `$${raffle.revenue.toLocaleString()}`,
    `${raffle.conversion.toFixed(2)}%`,
    `${raffle.roi.toFixed(2)}%`,
  ])

  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
    startY: 150,
    theme: "grid",
    headStyles: {
      fillColor: [45, 42, 74], // colors.primary in RGB
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
  })

  // Page number
  doc.setFontSize(10)
  doc.text(`Page 2 of ${totalPages}`, 105, 280, { align: "center" })

  // Return the PDF as a buffer
  return doc.output("arraybuffer")
}

export async function generatePPTX(data: ReportData): Promise<Buffer> {
  try {
    // Create a new presentation
    const pres = new PptxGenJS()

    // Set master slide
    pres.defineSlideMaster({
      title: "MASTER_SLIDE",
      background: { color: "FFFFFF" },
    })

    // Cover Slide
    const slide1 = pres.addSlide()

    // Add logo if available
    if (data.companyLogo) {
      try {
        await slide1.addImage({
          path: data.companyLogo,
          x: "40%",
          y: "20%",
          w: "20%",
          h: "20%",
        })
      } catch (error) {
        console.error("Error adding logo to PowerPoint:", error)
      }
    }

    // Add title
    slide1.addText("Raffle Performance Report", {
      x: "10%",
      y: "45%",
      w: "80%",
      h: "10%",
      fontSize: 44,
      color: "2D2A4A",
      bold: true,
      align: "center",
    })

    // Add company name and date range
    slide1.addText(
      [
        { text: data.companyName, options: { fontSize: 28, color: "2D2A4A" } },
        { text: "\n" },
        {
          text: `${format(data.dateRange.start, "MMMM d, yyyy")} - ${format(data.dateRange.end, "MMMM d, yyyy")}`,
          options: { fontSize: 16, color: "333333" },
        },
        { text: "\n" },
        { text: `Generated on: ${format(new Date(), "MMMM d, yyyy")}`, options: { fontSize: 14, color: "333333" } },
      ],
      {
        x: "10%",
        y: "60%",
        w: "80%",
        h: "20%",
        align: "center",
      },
    )

    // Summary Slide
    const slide2 = pres.addSlide()

    // Add title
    slide2.addText("Performance Summary", {
      x: "5%",
      y: "5%",
      w: "90%",
      fontSize: 32,
      color: "2D2A4A",
      bold: true,
    })

    // Add metric boxes
    const metrics = [
      { title: "TOTAL ENTRIES", value: data.metrics.totalEntries.toLocaleString() },
      { title: "TOTAL REVENUE", value: `$${data.metrics.totalRevenue.toLocaleString()}` },
      { title: "CONVERSION RATE", value: `${data.metrics.conversionRate.toFixed(2)}%` },
      { title: "TOTAL VIEWS", value: data.metrics.views.toLocaleString() },
    ]

    metrics.forEach((metric, index) => {
      const row = Math.floor(index / 2)
      const col = index % 2

      // Add shape
      slide2.addShape(pres.ShapeType.RECTANGLE, {
        x: 0.5 + col * 4.5,
        y: 1.5 + row * 2,
        w: 4,
        h: 1.5,
        fill: { color: "FFFFFF" },
        line: { color: "2D2A4A", width: 1 },
      })

      // Add metric title
      slide2.addText(metric.title, {
        x: 0.5 + col * 4.5,
        y: 1.5 + row * 2,
        w: 4,
        h: 0.5,
        fontSize: 14,
        color: "2D2A4A",
        bold: true,
        align: "center",
      })

      // Add metric value
      slide2.addText(metric.value, {
        x: 0.5 + col * 4.5,
        y: 2 + row * 2,
        w: 4,
        h: 0.8,
        fontSize: 24,
        color: "00B8A9",
        bold: true,
        align: "center",
      })
    })

    // Raffle Performance Slide
    const slide3 = pres.addSlide()

    // Add title
    slide3.addText("Raffle Campaign Performance", {
      x: "5%",
      y: "5%",
      w: "90%",
      fontSize: 32,
      color: "2D2A4A",
      bold: true,
    })

    // Add table data
    const tableData = [
      ["Raffle Name", "Start Date", "End Date", "Entries", "Revenue", "Conv. %", "ROI %"],
      ...data.raffleData.map((raffle) => [
        raffle.name,
        format(raffle.startDate, "MM/dd/yyyy"),
        format(raffle.endDate, "MM/dd/yyyy"),
        raffle.entries.toLocaleString(),
        `$${raffle.revenue.toLocaleString()}`,
        `${raffle.conversion.toFixed(2)}%`,
        `${raffle.roi.toFixed(2)}%`,
      ]),
    ]

    // Add table
    slide3.addTable(tableData, {
      x: "5%",
      y: "20%",
      w: "90%",
      colW: [3, 1.5, 1.5, 1.2, 1.2, 1.2, 1.2],
      fontSize: 12,
      color: "333333",
      border: { type: "solid", color: "2D2A4A", pt: 1 },
      align: "center",
    })

    // Write to buffer
    const buffer = await pres.write("nodebuffer")
    return Buffer.from(buffer)
  } catch (error) {
    console.error("Error generating PowerPoint:", error)
    throw new Error(`PowerPoint generation failed: ${error.message}`)
  }
}

