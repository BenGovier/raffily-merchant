"use client"

import { useState, useEffect } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Check, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// This would typically come from your database
const mockEntries: Entry[] = [
  {
    id: "ENTRY-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    raffleId: "RAFFLE-001",
    raffleName: "iPhone 15 Pro Giveaway",
    entryDate: "2023-11-01T10:30:00Z",
    status: "active",
    marketingOptIn: true,
  },
  {
    id: "ENTRY-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    raffleId: "RAFFLE-001",
    raffleName: "iPhone 15 Pro Giveaway",
    entryDate: "2023-11-01T11:45:00Z",
    status: "active",
    marketingOptIn: false,
  },
  {
    id: "ENTRY-003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 456-7890",
    raffleId: "RAFFLE-002",
    raffleName: "PlayStation 5 Giveaway",
    entryDate: "2023-11-02T09:15:00Z",
    status: "active",
    marketingOptIn: true,
  },
  {
    id: "ENTRY-004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 789-0123",
    raffleId: "RAFFLE-002",
    raffleName: "PlayStation 5 Giveaway",
    entryDate: "2023-11-02T14:20:00Z",
    status: "active",
    marketingOptIn: true,
  },
  {
    id: "ENTRY-005",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 (555) 234-5678",
    raffleId: "RAFFLE-003",
    raffleName: "Amazon Gift Card Giveaway",
    entryDate: "2023-11-03T16:10:00Z",
    status: "active",
    marketingOptIn: false,
  },
]

export type Entry = {
  id: string
  name: string
  email: string
  phone: string
  raffleId: string
  raffleName: string
  entryDate: string
  status: "active" | "disqualified" | "winner"
  marketingOptIn: boolean
}

export const columns: ColumnDef<Entry>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "raffleName",
    header: "Raffle",
    cell: ({ row }) => <div>{row.getValue("raffleName")}</div>,
  },
  {
    accessorKey: "entryDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Entry Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("entryDate"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "outline" : status === "winner" ? "default" : "destructive"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "marketingOptIn",
    header: "Marketing Opt-in",
    cell: ({ row }) => {
      const optIn = row.getValue("marketingOptIn") as boolean
      return (
        <div className="flex justify-center">
          {optIn ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const entry = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(entry.email)}>Copy Email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Mark as Winner</DropdownMenuItem>
            <DropdownMenuItem>Disqualify</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function EntriesTable() {
  const { user } = useAuth()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<Entry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Helper function to check if user is a demo account
  const isDemoAccount = (user) => {
    const demoEmails = ["demo@example.com", "ben@raffily.com"]
    return demoEmails.includes(user?.email) || (user?.id && typeof user.id === "string" && user.id.includes("demo"))
  }

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        if (!user) {
          setData([])
          setIsLoading(false)
          return
        }

        if (isDemoAccount(user)) {
          // For demo accounts, use mock data
          console.log("Using mock data for demo account")
          setData(mockEntries)
        } else {
          // For real merchant accounts, fetch from API
          // In a real implementation, this would be an API call
          // For now, we'll set an empty array to show no entries for real accounts
          console.log("Real merchant account - should fetch from API")
          setData([])

          // Uncomment and implement when API is ready:
          // const response = await fetch('/api/entries');
          // if (response.ok) {
          //   const data = await response.json();
          //   setData(data);
          // } else {
          //   console.error('Failed to fetch entries');
          //   setData([]);
          // }
        }
      } catch (error) {
        console.error("Error fetching entries:", error)
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntries()
  }, [user])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B8A9]"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name or email..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isDemoAccount(user)
                    ? "No entries found."
                    : "No entries yet. Create a raffle to start collecting entries."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
