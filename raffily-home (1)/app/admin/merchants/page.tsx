"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  UserPlus,
  Users,
  Ban,
  CheckCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for merchants
const mockMerchants = [
  {
    id: "m001",
    name: "Acme Corporation",
    email: "contact@acmecorp.com",
    plan: "Enterprise",
    status: "active",
    raffles: 5,
    joinDate: "2023-01-15",
  },
  {
    id: "m002",
    name: "Global Retail",
    email: "info@globalretail.com",
    plan: "Business",
    status: "active",
    raffles: 3,
    joinDate: "2023-02-22",
  },
  {
    id: "m003",
    name: "City Bank",
    email: "support@citybank.com",
    plan: "Enterprise",
    status: "active",
    raffles: 2,
    joinDate: "2023-03-10",
  },
  {
    id: "m004",
    name: "Sunset Hotels",
    email: "bookings@sunsethotels.com",
    plan: "Business",
    status: "suspended",
    raffles: 1,
    joinDate: "2023-04-05",
  },
  {
    id: "m005",
    name: "Tech Innovations",
    email: "hello@techinnovations.com",
    plan: "Starter",
    status: "active",
    raffles: 1,
    joinDate: "2023-05-18",
  },
  {
    id: "m006",
    name: "Fitness First",
    email: "members@fitnessfirst.com",
    plan: "Starter",
    status: "pending",
    raffles: 0,
    joinDate: "2023-06-30",
  },
  {
    id: "m007",
    name: "Gourmet Delights",
    email: "orders@gourmetdelights.com",
    plan: "Business",
    status: "pending",
    raffles: 0,
    joinDate: "2023-07-12",
  },
]

export default function AdminMerchantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [merchants, setMerchants] = useState(mockMerchants)

  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.plan.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      default:
        return null
    }
  }

  const handleApproveMerchant = (id: string) => {
    setMerchants(merchants.map((merchant) => (merchant.id === id ? { ...merchant, status: "active" } : merchant)))
  }

  const handleSuspendMerchant = (id: string) => {
    if (confirm("Are you sure you want to suspend this merchant?")) {
      setMerchants(merchants.map((merchant) => (merchant.id === id ? { ...merchant, status: "suspended" } : merchant)))
    }
  }

  const handleActivateMerchant = (id: string) => {
    setMerchants(merchants.map((merchant) => (merchant.id === id ? { ...merchant, status: "active" } : merchant)))
  }

  const handleDeleteMerchant = (id: string) => {
    if (confirm("Are you sure you want to delete this merchant? This action cannot be undone.")) {
      setMerchants(merchants.filter((merchant) => merchant.id !== id))
    }
  }

  const activeCount = merchants.filter((m) => m.status === "active").length
  const pendingCount = merchants.filter((m) => m.status === "pending").length
  const totalRaffles = merchants.reduce((acc, merchant) => acc + merchant.raffles, 0)

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Merchants</h1>
          <p className="text-gray-500">Manage all merchants on the platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Merchant
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Merchants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{merchants.length}</div>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-green-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Merchants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeCount}</div>
            <p className="text-sm text-gray-500 mt-1">{pendingCount} pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Raffles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRaffles}</div>
            <p className="text-sm text-gray-500 mt-1">Across all merchants</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search merchants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Raffles</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMerchants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No merchants found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90 flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add New Merchant
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMerchants.map((merchant) => (
                  <TableRow key={merchant.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{merchant.name}</div>
                        <div className="text-sm text-gray-500">{merchant.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {merchant.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(merchant.status)}</TableCell>
                    <TableCell>
                      <Link href={`/admin/merchants/${merchant.id}/raffles`} className="text-blue-600 hover:underline">
                        {merchant.raffles} raffles
                      </Link>
                    </TableCell>
                    <TableCell>{new Date(merchant.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/merchants/${merchant.id}`} className="cursor-pointer flex items-center">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/merchants/${merchant.id}/edit`}
                              className="cursor-pointer flex items-center"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Merchant
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          {merchant.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleApproveMerchant(merchant.id)}
                              className="text-green-600 cursor-pointer"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}

                          {merchant.status === "active" && (
                            <DropdownMenuItem
                              onClick={() => handleSuspendMerchant(merchant.id)}
                              className="text-yellow-600 cursor-pointer"
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          )}

                          {merchant.status === "suspended" && (
                            <DropdownMenuItem
                              onClick={() => handleActivateMerchant(merchant.id)}
                              className="text-green-600 cursor-pointer"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteMerchant(merchant.id)}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredMerchants.length} of {merchants.length} merchants
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

