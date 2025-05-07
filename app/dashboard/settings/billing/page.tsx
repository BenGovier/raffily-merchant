"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Download, AlertTriangle, Plus } from "lucide-react"
import { formatCurrency } from "@/lib/stripe-config"

export default function BillingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [billingData, setBillingData] = useState({
    paymentMethods: [],
    invoices: [],
    currentUsage: {
      total: 0,
      tickets: 0,
      questions: 0,
    },
  })

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        setLoading(true)

        // In a real implementation, these would be actual API calls
        // For demo purposes, we'll use mock data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setBillingData({
          paymentMethods: [
            {
              id: "pm_1",
              brand: "visa",
              last4: "4242",
              expMonth: 12,
              expYear: 2025,
              isDefault: true,
            },
          ],
          invoices: [
            {
              id: "inv_1",
              amount: 12500,
              status: "paid",
              items: [
                { type: "ticket", quantity: 400, amount: 10000 },
                { type: "question", quantity: 100, amount: 2500 },
              ],
              createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              paidAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
            },
            {
              id: "inv_2",
              amount: 7500,
              status: "pending",
              items: [
                { type: "ticket", quantity: 200, amount: 5000 },
                { type: "question", quantity: 100, amount: 2500 },
              ],
              createdAt: new Date(),
              dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            },
          ],
          currentUsage: {
            total: 5000,
            tickets: 150,
            questions: 50,
          },
        })
      } catch (error) {
        console.error("Error fetching billing data:", error)
        setError("Failed to load billing data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchBillingData()
  }, [])

  const handleAddPaymentMethod = () => {
    router.push("/dashboard/settings/billing/add-payment-method")
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real implementation, this would download the invoice
    console.log("Downloading invoice:", invoiceId)
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Billing & Payments</h1>

      {error && (
        <Alert className="mb-6 bg-red-50 border border-red-200 text-red-800">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Summary</CardTitle>
              <CardDescription>Your current billing status and payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-2">Current Usage</h3>
                      <p className="text-2xl font-bold">{formatCurrency(billingData.currentUsage.total)}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Will be billed on {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 mb-2">Payment Method</h3>
                      {billingData.paymentMethods.length > 0 ? (
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
                          <div>
                            <p className="font-medium">
                              {billingData.paymentMethods[0].brand.charAt(0).toUpperCase() +
                                billingData.paymentMethods[0].brand.slice(1)}{" "}
                              •••• {billingData.paymentMethods[0].last4}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires {billingData.paymentMethods[0].expMonth}/{billingData.paymentMethods[0].expYear}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-amber-600 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          <p>No payment method on file</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-2">Billing Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tickets issued:</span>
                        <span className="font-medium">
                          {billingData.currentUsage.tickets} (£{(billingData.currentUsage.tickets * 0.25).toFixed(2)})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Questions answered:</span>
                        <span className="font-medium">
                          {billingData.currentUsage.questions} (£
                          {(billingData.currentUsage.questions * 0.25).toFixed(2)})
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>{formatCurrency(billingData.currentUsage.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddPaymentMethod} disabled={loading}>
                {billingData.paymentMethods.length > 0 ? "Update Payment Method" : "Add Payment Method"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ) : billingData.paymentMethods.length > 0 ? (
                <div className="space-y-4">
                  {billingData.paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <p className="font-medium">
                            {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}
                          </p>
                          <p className="text-sm text-gray-500">
                            Expires {method.expMonth}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {method.isDefault && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-3">Default</span>
                        )}
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Payment Methods</h3>
                  <p className="text-gray-500 mb-4">You haven't added any payment methods yet.</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddPaymentMethod} disabled={loading}>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and download your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ) : billingData.invoices.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Invoice</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingData.invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b">
                          <td className="py-3 px-4">
                            <span className="font-medium">INV-{invoice.id.substring(0, 8)}</span>
                          </td>
                          <td className="py-3 px-4">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{formatCurrency(invoice.amount)}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                invoice.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : invoice.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(invoice.id)}>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Download className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Invoices</h3>
                  <p className="text-gray-500">You don't have any invoices yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Details</CardTitle>
              <CardDescription>Track your usage and associated costs</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-40 bg-gray-200 rounded"></div>
                  <div className="h-40 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-4">Current Billing Cycle</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Tickets ({billingData.currentUsage.tickets})</span>
                          <span className="text-sm text-gray-500">
                            £{(billingData.currentUsage.tickets * 0.25).toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min(100, (billingData.currentUsage.tickets / 1000) * 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Questions ({billingData.currentUsage.questions})</span>
                          <span className="text-sm text-gray-500">
                            £{(billingData.currentUsage.questions * 0.25).toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min(100, (billingData.currentUsage.questions / 500) * 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between font-medium">
                          <span>Total Usage:</span>
                          <span>{formatCurrency(billingData.currentUsage.total)}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Billing threshold: {formatCurrency(25000)} (Charged automatically when reached)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-4">Pricing Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Ticket issuance:</span>
                        <span className="font-medium">25p per ticket</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Question answers:</span>
                        <span className="font-medium">25p per answer</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Billing threshold:</span>
                        <span className="font-medium">{formatCurrency(25000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly billing:</span>
                        <span className="font-medium">1st of each month</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
