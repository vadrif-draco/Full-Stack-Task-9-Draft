const { loadRoutes } = require('./myRoutes');
const express = require('express')
const PORT = 3000 // 80

console.log("Initializing express...")
const APP = express();
APP.use(express.json())

console.log("Loading routes...")
loadRoutes(APP)

console.log(`Listening on port ${PORT}...`)
APP.listen(PORT);

// TODO: Next task - replace heroku backend with our backend