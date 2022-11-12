const { loadRootRoutes, loadAdminRoutes, loadHRDeptRoutes } = require('./2_myRoutes')
const express = require('express')
const PORT = 3000 // 80

// -----------------------------------------------------------------------------------------------

console.log("Initializing express...")

// Create the root express app
const ROOT = express()

// First thing I add to its middleware stack: JSON parsing
ROOT.use(express.json())

// Then I add a custom middleware function to log requests
ROOT.use((req) => { console.log(`${req.method}: ${req.url}`); req.next() })

// Note that since no path was provided, these middlewares will work for all child paths
console.log("Successfully initialized root express app.\n")

// -----------------------------------------------------------------------------------------------

console.log("Loading routes and their middlewares...")

// The root app users can only GET the root '/' path (for demo purposes)
loadRootRoutes(ROOT)

// Create the admin and admin authorization express apps and load their routes
const ADMIN = express()
const ADMINAUTH = express()
loadAdminRoutes(ADMIN, ADMINAUTH)
ROOT.use("/admin/", ADMIN)

// Create the HR department app and load its routes
const HRDEPT = express()
loadHRDeptRoutes(HRDEPT)
ROOT.use("/hr/", HRDEPT)

console.log("Successfully loaded all routes and their respective middlewares.\n")

// -----------------------------------------------------------------------------------------------

// Finally, we start listening on the predefined port
ROOT.listen(PORT)

console.log(`Listening on port ${PORT}...\n`)
