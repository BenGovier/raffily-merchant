const { MongoClient, ServerApiVersion } = require("mongodb")

// Use the connection string with the correct password
const uri =
  "mongodb+srv://ben:2qOXsIvFGqDs3tk6@cluster0.wla45.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // Connect the client to the server
    await client.connect()

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })

    console.log("Pinged your deployment. You successfully connected to MongoDB!")

    // List all databases
    const databasesList = await client.db().admin().listDatabases()
    console.log("Databases:")
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
  } catch (error) {
    console.error("Connection error:", error)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

run().catch(console.dir)
