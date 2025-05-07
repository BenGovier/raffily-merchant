const { MongoClient } = require("mongodb")

// Simplify the connection string
const uri = "mongodb+srv://ben:2qOXsIvFGqDs3tk6@cluster0.wla45.mongodb.net/?retryWrites=true&w=majority"

async function testConnection() {
  console.log("Starting MongoDB connection test...")
  console.log(`Connection string: ${uri.replace(/ben:[^@]+@/, "ben:****@")}`)

  const client = new MongoClient(uri, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })

  try {
    console.log("Attempting to connect...")
    await client.connect()
    console.log("Connected successfully!")

    console.log("Sending ping command...")
    await client.db("admin").command({ ping: 1 })
    console.log("Ping successful!")

    // List databases to verify further access
    console.log("Listing databases...")
    const dbs = await client.db().admin().listDatabases()
    console.log("Available databases:")
    dbs.databases.forEach((db) => {
      console.log(` - ${db.name}`)
    })

    return true
  } catch (error) {
    console.error("Connection failed with error:", error)
    return false
  } finally {
    try {
      await client.close()
      console.log("Connection closed")
    } catch (e) {
      console.error("Error closing connection:", e)
    }
  }
}

// Run the test
testConnection()
  .then((success) => {
    console.log(`Test ${success ? "PASSED" : "FAILED"}`)
    process.exit(success ? 0 : 1)
  })
  .catch((err) => {
    console.error("Unexpected error:", err)
    process.exit(1)
  })
