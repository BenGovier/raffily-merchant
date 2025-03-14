"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [profileForm, setProfileForm] = useState({
    name: "John Smith",
    email: "john@example.com",
    phone: "+44 7123 456789",
    bio: "Marketing Director at Example Ltd with over 10 years of experience in customer engagement and retention strategies.",
  })

  const [companyForm, setCompanyForm] = useState({
    companyName: "Example Ltd",
    website: "https://example.com",
    industry: "Retail",
    address: "123 Business Park, London, UK",
    logo: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    raffleUpdates: true,
    weeklyReports: true,
    marketingEmails: false,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCompanyChange = (e) => {
    const { name, value } = e.target
    setCompanyForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name, checked) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // Handle profile update
    alert("Profile updated successfully!")
  }

  const handleCompanySubmit = (e) => {
    e.preventDefault()
    // Handle company update
    alert("Company details updated successfully!")
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    // Handle password update
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    alert("Password updated successfully!")
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={profileForm.name} onChange={handleProfileChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" value={profileForm.phone} onChange={handleProfileChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" value={profileForm.bio} onChange={handleProfileChange} rows={4} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <form onSubmit={handleCompanySubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={companyForm.companyName}
                    onChange={handleCompanyChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={companyForm.website}
                    onChange={handleCompanyChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" name="industry" value={companyForm.industry} onChange={handleCompanyChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={companyForm.address}
                    onChange={handleCompanyChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                      {companyForm.logo ? (
                        <img
                          src={companyForm.logo || "/placeholder.svg"}
                          alt="Company logo"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400">No logo</span>
                      )}
                    </div>
                    <Input
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        // Handle file upload
                      }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how we contact you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="raffleUpdates">Raffle Updates</Label>
                  <p className="text-sm text-gray-500">Get notified about your raffle status changes</p>
                </div>
                <Switch
                  id="raffleUpdates"
                  checked={notificationSettings.raffleUpdates}
                  onCheckedChange={(checked) => handleNotificationChange("raffleUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklyReports">Weekly Reports</Label>
                  <p className="text-sm text-gray-500">Receive weekly performance reports</p>
                </div>
                <Switch
                  id="weeklyReports"
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => alert("Notification preferences saved!")}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Update your password and security preferences</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Update Password</Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Protect your account with an additional security layer</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>Permanently delete your account and all data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Once you delete your account, there is no going back. All your data will be permanently removed.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                onClick={() => confirm("Are you sure you want to delete your account? This action cannot be undone.")}
              >
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

