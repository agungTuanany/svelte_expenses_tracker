"use-strict"
/*
 * Entry Point Server
 *
 */

// Dependencies
const express       = require ("express")
const mongoose      = require ("mongoose")

const config        = require ("./lib/config")

// ##################################
// Instant Variable
const app = express ()


// ##################################
// Database configuration
mongoose.connect (config.mongoURI, {
    useNewUrlParser     : true,
    useCreateIndex      : true,
    useUnifiedTopology  : true
})
    .then (() => console.log ("MongoDB is connected"))
    .catch (err => console.log ("MongoDB error:", err))


// ##################################
// Express router
app.get ("/", (req, res) => res.send ("hello world"))


// ##################################
// Express init
app.listen (config.port, () => console.log (`Express is running at port ${config.port}`))
