// ClickSend API credentials
export const CLICKSEND_API_USERNAME = "ben@raffily.co.uk"
export const CLICKSEND_API_KEY = "AA85DF9E-A35C-5F24-1189-E6894B8D7D2F"

// Create Basic Auth header
export const getClickSendAuthHeader = () => {
  return "Basic " + Buffer.from(`${CLICKSEND_API_USERNAME}:${CLICKSEND_API_KEY}`).toString("base64")
}

// Default sender configuration
export const setupDefaultSender = async (countryCode = "GB") => {
  try {
    const response = await fetch("https://rest.clicksend.com/v3/senders/default-senders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getClickSendAuthHeader(),
      },
      body: JSON.stringify({
        country_code: countryCode,
        product_type: "SMS",
        default_sender_strategies: [
          {
            sender_type: "ALPHA",
            sender_id: "Raffily",
          },
        ],
      }),
    })

    const data = await response.json()
    console.log("Default sender setup response:", data)
    return data
  } catch (error) {
    console.error("Error setting up default sender:", error)
    return null
  }
}

// Get compliant sender types for a country
export const getCompliantSenderTypes = async (countryCode = "GB") => {
  try {
    const response = await fetch(
      `https://rest.clicksend.com/v3/senders/compliant-sender-types?filter[product_type]=SMS&filter[country_code][0]=${countryCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getClickSendAuthHeader(),
        },
      },
    )

    const data = await response.json()
    console.log("Compliant sender types:", data)
    return data
  } catch (error) {
    console.error("Error getting compliant sender types:", error)
    return null
  }
}
