import { EntriesTable } from "@/components/entries/entries-table"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function EntriesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Raffle Entries" text="View and manage all entries across your raffles." />
      <EntriesTable />
    </DashboardShell>
  )
}
