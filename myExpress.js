const { loadRoutes } = require('./myRoutes');
const express = require('express')
const PORT = 3000 // 80

console.log("Initializing express...")
const ROOT = express();
const ADMIN = express();
const HRDEPT = express();
ROOT.use(express.json())

console.log("Loading routes...")
loadRoutes(ROOT, ADMIN, HRDEPT)

console.log(`Listening on port ${PORT}...`)
ROOT.listen(PORT);

// TODO: Next task - replace heroku backend with our backend