"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  const { user, updateUser } = useAuth()
  const [generalForm, setGeneralForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    companyName: user?.company || "",
    website: user?.website || "",
    industry: user?.industry || "",
    street: user?.street || "",
    city: user?.city || "",
    state: user?.state || "",
    postalCode: user?.postalCode || "",
    country: user?.country || "",
    logo: user?.companyLogo || "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    raffleUpdates: true,
    weeklyReports: true,
    marketingEmails: false,
  })

  const [communicationSettings, setCommunicationSettings] = useState({
    billingEmail: user?.billingEmail || "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Add profile completion state and effect
  const [isProfileComplete, setIsProfileComplete] = useState(false)

  useEffect(() => {
    // Check if profile is complete based on form data
    const isComplete =
      generalForm.firstName !== "" &&
      generalForm.lastName !== "" &&
      generalForm.email !== "" &&
      generalForm.phone !== "" &&
      generalForm.companyName !== "" &&
      generalForm.website !== "" &&
      generalForm.industry !== "" &&
      generalForm.street !== "" &&
      generalForm.city !== "" &&
      generalForm.state !== "" &&
      generalForm.postalCode !== "" &&
      generalForm.country !== "" &&
      generalForm.logo !== ""

    setIsProfileComplete(isComplete)
  }, [generalForm])

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name, checked) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleCommunicationChange = (e) => {
    const { name, value } = e.target
    setCommunicationSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleGeneralSubmit = async (e) => {
    e.preventDefault()
    // Update the user context with the new company information
    updateUser({
      ...user,
      firstName: generalForm.firstName,
      lastName: generalForm.lastName,
      email: generalForm.email,
      phone: generalForm.phone,
      company: generalForm.companyName,
      website: generalForm.website,
      industry: generalForm.industry,
      street: generalForm.street,
      city: generalForm.city,
      state: generalForm.state,
      postalCode: generalForm.postalCode,
      country: generalForm.country,
      companyLogo: generalForm.logo,
    })
    alert("General settings updated successfully!")
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Here you would typically upload the file to your storage service
      // and get back a URL. This is a simplified example
      const reader = new FileReader()
      reader.onloadend = () => {
        const logoUrl = reader.result
        setGeneralForm((prev) => ({ ...prev, logo: logoUrl }))
        // Update the user context with the new logo
        updateUser({ ...user, companyLogo: logoUrl })
      }
      reader.readAsDataURL(file)
    }
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

  const handleCommunicationSubmit = (e) => {
    e.preventDefault()
    updateUser({
      ...user,
      billingEmail: communicationSettings.billingEmail,
    })
    alert("Communication settings updated successfully!")
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>

      {/* Add profile completion alert */}
      {!isProfileComplete && (
        <Alert className="bg-yellow-50 border border-yellow-200 text-yellow-800">
          <AlertDescription className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Please complete your profile to unlock all features and customize your experience.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Update your personal and company details</CardDescription>
            </CardHeader>
            <form onSubmit={handleGeneralSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-medium text-gray-700">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={generalForm.firstName}
                      onChange={handleGeneralChange}
                      className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-medium text-gray-700">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={generalForm.lastName}
                      onChange={handleGeneralChange}
                      className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={generalForm.email}
                      onChange={handleGeneralChange}
                      className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={generalForm.phone}
                      onChange={handleGeneralChange}
                      className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="font-medium text-gray-700">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={generalForm.companyName}
                      onChange={handleGeneralChange}
                      className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="font-medium text-gray-700">
                      Website
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={generalForm.website}
                      onChange={handleGeneralChange}
                      className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="font-medium text-gray-700">
                      Industry
                    </Label>
                    <Input
                      id="industry"
                      name="industry"
                      value={generalForm.industry}
                      onChange={handleGeneralChange}
                      className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo" className="font-medium text-gray-700">
                      Company Logo
                    </Label>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                        {generalForm.logo ? (
                          <img
                            src={generalForm.logo || "/placeholder.svg"}
                            alt="Company logo"
                            className="h-full w-full object-contain rounded-md"
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
                        onChange={handleLogoUpload}
                        className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Business Address</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="street" className="font-medium text-gray-700">
                        Street Address
                      </Label>
                      <Input
                        id="street"
                        name="street"
                        value={generalForm.street}
                        onChange={handleGeneralChange}
                        className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="font-medium text-gray-700">
                        City
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={generalForm.city}
                        onChange={handleGeneralChange}
                        className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state" className="font-medium text-gray-700">
                        State/Province
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={generalForm.state}
                        onChange={handleGeneralChange}
                        className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="font-medium text-gray-700">
                        Postal Code
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={generalForm.postalCode}
                        onChange={handleGeneralChange}
                        className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="country" className="font-medium text-gray-700">
                        Country
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={generalForm.country}
                        onChange={handleGeneralChange}
                        className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                      />
                    </div>
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

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Communications</CardTitle>
              <CardDescription>Manage email addresses for billing and invoices</CardDescription>
            </CardHeader>
            <form onSubmit={handleCommunicationSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="billingEmail" className="font-medium text-gray-700">
                    Billing/Invoices Email
                  </Label>
                  <Input
                    id="billingEmail"
                    name="billingEmail"
                    type="email"
                    value={communicationSettings.billingEmail}
                    onChange={handleCommunicationChange}
                    placeholder="billing@example.com"
                    className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Communications</Button>
              </CardFooter>
            </form>
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
                  <Label htmlFor="currentPassword" className="font-medium text-gray-700">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="font-medium text-gray-700">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-medium text-gray-700">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="border-gray-300 bg-white shadow-sm focus:border-[#00B8A9] focus:ring-[#00B8A9]"
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
