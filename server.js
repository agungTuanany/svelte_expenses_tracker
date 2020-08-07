"use-strict"
/*
 * Entry Point Server
 *
 */

// Dependencies
const express    = require("express")
const mongoose   = require("mongoose")
const cors       = require("cors")          // Allow to access API from the browser
const bodyParser = require("body-parser")
const morgan     = require("morgan")        // Check all HTTP request and log in apps
const path       = require("path")

// Internal dependencies
const config            = require("./lib/config")
const transactionRoutes = require("./routes/transactions")

// Instant Variable
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(morgan("tiny"))

// Database configuration
mongoose.connect(config.mongoURI, {
    useNewUrlParser     : true,
    useCreateIndex      : true,
    useUnifiedTopology  : true
})
    .then(() => console.log("MongoDB is connected"))
    .catch (err => console.log("MongoDB error:", err))

// Transaction routes
app.use("/api/transactions", transactionRoutes)

// Express router server static files
if (process.env.NODE_ENV === "production") {
    console.log("production state")
    app.use(express.static("client/public"))
    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "public", "index.html"))
    })
}

// Express init
app.listen(config.port, () => console.log(`Express is running at port ${config.port}`))
