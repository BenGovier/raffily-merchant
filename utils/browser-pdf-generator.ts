// This is a pure client-side PDF generator that doesn't rely on any server-side processing
// It uses jsPDF directly in the browser

export async function generateBrowserPDF(data: any): Promise<void> {
  try {
    console.log("Generating PDF in browser...")

    // Import jsPDF and jspdf-autotable
    const jsPDFModule = await import("jspdf")
    const jsPDF = jsPDFModule.default

    // Create a new document
    const doc = new jsPDF()

    // Import and apply the autotable plugin
    const autoTableModule = await import("jspdf-autotable")
    const autoTable = autoTableModule.default

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

    // Add table
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

    // Table headers and data
    const headers = [["Raffle", "Start Date", "End Date", "Entries", "Revenue", "Conv. %", "ROI %"]]
    const tableData = raffles.map((raffle) => [
      raffle.name,
      raffle.startDate instanceof Date ? raffle.startDate.toLocaleDateString() : raffle.startDate,
      raffle.endDate instanceof Date ? raffle.endDate.toLocaleDateString() : raffle.endDate,
      raffle.entries.toLocaleString(),
      `$${raffle.revenue.toLocaleString()}`,
      `${raffle.conversion.toFixed(2)}%`,
      `${raffle.roi.toFixed(2)}%`,
    ])

    // Use the imported autoTable function
    autoTable(doc, {
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

    // Save the PDF
    doc.save(`raffily-performance-report-${new Date().toISOString().split("T")[0]}.pdf`)
    console.log("PDF generated and downloaded successfully")
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("Failed to generate PDF report. Please try again.")
  }
}
