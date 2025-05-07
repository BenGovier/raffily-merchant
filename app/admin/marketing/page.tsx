"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar, Check, Clock, Edit, Eye, MailCheck, MoreHorizontal, Plus, Send, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for email templates
const mockTemplates = [
  {
    id: "t001",
    name: "Welcome Email",
    subject: "Welcome to Raffily!",
    type: "onboarding",
    lastUpdated: "2023-07-15",
    status: "active",
  },
  {
    id: "t002",
    name: "New Raffle Announcement",
    subject: "Your new raffle is live!",
    type: "notification",
    lastUpdated: "2023-08-01",
    status: "active",
  },
  {
    id: "t003",
    name: "Raffle Winner Notification",
    subject: "Congratulations! You've won!",
    type: "notification",
    lastUpdated: "2023-08-10",
    status: "active",
  },
  {
    id: "t004",
    name: "Monthly Newsletter",
    subject: "This Month at Raffily: Updates & Tips",
    type: "newsletter",
    lastUpdated: "2023-08-15",
    status: "active",
  },
  {
    id: "t005",
    name: "Raffle Ending Soon",
    subject: "Last chance to enter our raffle!",
    type: "reminder",
    lastUpdated: "2023-07-22",
    status: "active",
  },
  {
    id: "t006",
    name: "Feedback Request",
    subject: "How was your experience with Raffily?",
    type: "feedback",
    lastUpdated: "2023-06-30",
    status: "inactive",
  },
]

// Mock data for campaigns
const mockCampaigns = [
  {
    id: "c001",
    name: "August Newsletter",
    template: "Monthly Newsletter",
    recipients: "All Merchants",
    scheduledDate: "2023-08-25T10:00:00Z",
    status: "scheduled",
  },
  {
    id: "c002",
    name: "New Feature Announcement",
    template: "Custom Template",
    recipients: "Active Merchants",
    sentDate: "2023-08-15T09:30:00Z",
    status: "sent",
    openRate: "68%",
    clickRate: "42%",
  },
  {
    id: "c003",
    name: "Raffle Best Practices",
    template: "Custom Template",
    recipients: "New Merchants",
    sentDate: "2023-08-01T14:00:00Z",
    status: "sent",
    openRate: "75%",
    clickRate: "51%",
  },
  {
    id: "c004",
    name: "Holiday Promotion Tips",
    template: "Custom Template",
    recipients: "All Merchants",
    status: "draft",
  },
]

export default function AdminMarketingPage() {
  const [activeTab, setActiveTab] = useState("templates")

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketing</h1>
          <p className="text-gray-500">Manage email templates and campaigns for merchants</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Email Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockTemplates.length}</div>
            <p className="text-sm text-gray-500 mt-1">
              {mockTemplates.filter((t) => t.status === "active").length} active templates
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Campaigns Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockCampaigns.filter((c) => c.status === "sent").length}</div>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">71%</div>
            <p className="text-sm text-gray-500 mt-1">
              <span className="text-green-500">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Email Templates</h2>
            <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell className="capitalize">{template.type}</TableCell>
                    <TableCell>{template.subject}</TableCell>
                    <TableCell>{new Date(template.lastUpdated).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full mr-2 ${
                            template.status === "active" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></div>
                        <span className="capitalize">{template.status}</span>
                      </div>
                    </TableCell>
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
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Send Test
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {template.status === "active" ? (
                            <DropdownMenuItem>
                              <Trash className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Email Campaigns</h2>
            <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>{campaign.template}</TableCell>
                    <TableCell>{campaign.recipients}</TableCell>
                    <TableCell>
                      {campaign.status === "sent" ? (
                        <div className="flex items-center">
                          <MailCheck className="h-4 w-4 text-green-500 mr-2" />
                          <span>{new Date(campaign.sentDate).toLocaleDateString()}</span>
                        </div>
                      ) : campaign.status === "scheduled" ? (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                          <span>{new Date(campaign.scheduledDate).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          campaign.status === "sent"
                            ? "bg-green-100 text-green-800"
                            : campaign.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <span className="capitalize">{campaign.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {campaign.status === "sent" ? (
                        <div className="text-sm">
                          <div>Open: {campaign.openRate}</div>
                          <div>Click: {campaign.clickRate}</div>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
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
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {campaign.status !== "sent" && (
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {campaign.status === "draft" && (
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule
                            </DropdownMenuItem>
                          )}
                          {campaign.status === "scheduled" && (
                            <DropdownMenuItem>
                              <Clock className="h-4 w-4 mr-2" />
                              Reschedule
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {campaign.status !== "sent" && (
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-6">Email Settings</h2>

            <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sender Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Sender Name</Label>
                    <Input id="sender-name" defaultValue="Raffily Team" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Sender Email</Label>
                    <Input id="sender-email" defaultValue="noreply@raffily.com" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Email Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Include Raffily Branding</Label>
                      <p className="text-sm text-gray-500">Add Raffily logo and footer to all emails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Track Email Opens</Label>
                      <p className="text-sm text-gray-500">Collect data on email open rates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Track Link Clicks</Label>
                      <p className="text-sm text-gray-500">Collect data on link click rates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Automated Emails</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Welcome Email</Label>
                      <p className="text-sm text-gray-500">Send to new merchants when they sign up</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Raffle Creation Confirmation</Label>
                      <p className="text-sm text-gray-500">Send when a merchant creates a new raffle</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Monthly Activity Summary</Label>
                      <p className="text-sm text-gray-500">Send monthly performance reports to merchants</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-[#00B8A9] hover:bg-[#00B8A9]/90">Save Settings</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
