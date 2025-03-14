"use client"

import type React from "react"

import { useState } from "react"
import { Check, Mail, MessageSquare, Phone, Send } from "lucide-react"
import MainNav from "@/components/MainNav"
import Footer from "@/components/Footer"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    legalSupport: false,
    startRaffle: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real implementation, you would send the form data to your backend
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Redirect to thank you page after a delay
    setTimeout(() => {
      window.location.href = "/thank-you"
    }, 2000)
  }

  return (
    <>
      <MainNav />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1E0B36] mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions about Raffily? Want to start a global raffle? Need legal support? We're here to help you
                every step of the way.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 p-8 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                <p className="text-green-700">Thank you for contacting us. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="bg-[#0A1F44] text-white p-8 md:w-1/3">
                    <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Mail className="h-5 w-5 mt-1" />
                        <div>
                          <p className="font-medium">Email Us</p>
                          <a href="mailto:info@raffily.com" className="text-[#00B8A9] hover:underline">
                            info@raffily.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="h-5 w-5 mt-1" />
                        <div>
                          <p className="font-medium">Call Us</p>
                          <a href="tel:+441234567890" className="text-[#00B8A9] hover:underline">
                            +44 (0) 123 456 7890
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <MessageSquare className="h-5 w-5 mt-1" />
                        <div>
                          <p className="font-medium">Office Hours</p>
                          <p className="text-sm">Monday - Friday: 9am - 5pm GMT</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:w-2/3">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                            placeholder="Your Company Ltd"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                            placeholder="+44 7123 456789"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                        >
                          <option value="">Select a subject</option>
                          <option value="Start a Raffle">Start a Raffle</option>
                          <option value="Legal Support">Legal Support</option>
                          <option value="Pricing Question">Pricing Question</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00B8A9]"
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="legalSupport"
                            name="legalSupport"
                            checked={formData.legalSupport}
                            onChange={handleCheckboxChange}
                            className="mt-1 h-4 w-4 text-[#00B8A9] focus:ring-[#00B8A9] border-gray-300 rounded"
                          />
                          <label htmlFor="legalSupport" className="ml-2 block text-sm text-gray-700">
                            I need legal support for running raffles in multiple countries
                          </label>
                        </div>
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="startRaffle"
                            name="startRaffle"
                            checked={formData.startRaffle}
                            onChange={handleCheckboxChange}
                            className="mt-1 h-4 w-4 text-[#00B8A9] focus:ring-[#00B8A9] border-gray-300 rounded"
                          />
                          <label htmlFor="startRaffle" className="ml-2 block text-sm text-gray-700">
                            I want to start a global raffle
                          </label>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent rounded-full text-base font-medium text-white bg-[#00B8A9] hover:bg-[#00B8A9]/90 transition-colors disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

