// A simplified PDF generator that doesn't use the autoTable plugin
export async function generateSimplePDF(data: any): Promise<void> {
  try {
    console.log("Generating simple PDF in browser...")

    // Import jsPDF
    const jsPDFModule = await import("jspdf")
    const jsPDF = jsPDFModule.default

    // Create a new document
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(22)
    doc.setTextColor(45, 42, 74) // Deep navy
    doc.text("Raffle Performance Report", 105, 20, { align: "center" })

    // Add company name
    doc.setFontSize(16)
    doc.text(data.companyName || "Raffily Merchant", 105, 30, { align: "center" })

    // Add date range
    doc.setFontSize(12)
    const startDate = data.dateRange?.start ? new Date(data.dateRange.start).toLocaleDateString() : "Jan 1, 2023"
    const endDate = data.dateRange?.end ? new Date(data.dateRange.end).toLocaleDateString() : "Mar 31, 2023"
    doc.text(`${startDate} - ${endDate}`, 105, 40, { align: "center" })

    // Add metrics
    doc.setFontSize(14)
    doc.text("Performance Summary", 20, 60)

    doc.setFontSize(12)
    doc.text(`Total Entries: ${(data.metrics?.totalEntries || 3000).toLocaleString()}`, 20, 70)
    doc.text(`Total Revenue: $${(data.metrics?.totalRevenue || 15000).toLocaleString()}`, 20, 80)
    doc.text(`Conversion Rate: ${(data.metrics?.conversionRate || 15.5).toFixed(2)}%`, 20, 90)
    doc.text(`Total Views: ${(data.metrics?.views || 25000).toLocaleString()}`, 20, 100)

    // Add raffle data as simple text
    doc.setFontSize(14)
    doc.text("Raffle Campaign Performance", 20, 120)

    // Default raffle data if none provided
    const raffles =
      data.raffleData && data.raffleData.length > 0
        ? data.raffleData
        : [
            {
              name: "Summer Giveaway",
              startDate: new Date(2023, 5, 1),
              endDate: new Date(2023, 5, 30),
              entries: 800,
              revenue: 4000,
              conversion: 12.5,
              roi: 320,
            },
            {
              name: "Holiday Special",
              startDate: new Date(2023, 11, 1),
              endDate: new Date(2023, 11, 31),
              entries: 1000,
              revenue: 5500,
              conversion: 15.2,
              roi: 380,
            },
          ]

    // Add raffle data as text
    let yPos = 130
    doc.setFontSize(12)

    raffles.forEach((raffle, index) => {
      doc.setFont(undefined, "bold")
      doc.text(`${index + 1}. ${raffle.name}`, 20, yPos)
      yPos += 10

      doc.setFont(undefined, "normal")
      const startDate = raffle.startDate instanceof Date ? raffle.startDate.toLocaleDateString() : raffle.startDate
      const endDate = raffle.endDate instanceof Date ? raffle.endDate.toLocaleDateString() : raffle.endDate

      doc.text(`Period: ${startDate} - ${endDate}`, 25, yPos)
      yPos += 7
      doc.text(`Entries: ${raffle.entries.toLocaleString()}`, 25, yPos)
      yPos += 7
      doc.text(`Revenue: $${raffle.revenue.toLocaleString()}`, 25, yPos)
      yPos += 7
      doc.text(`Conversion: ${raffle.conversion.toFixed(2)}%`, 25, yPos)
      yPos += 7
      doc.text(`ROI: ${raffle.roi.toFixed(2)}%`, 25, yPos)
      yPos += 15
    })

    // Save the PDF
    doc.save(`raffily-performance-report-${new Date().toISOString().split("T")[0]}.pdf`)
    console.log("PDF generated and downloaded successfully")
  } catch (error) {
    console.error("Error generating simple PDF:", error)
    alert("Failed to generate PDF report. Please try again.")
  }
}
