"use-strict"
/*
 * Entry Point Server
 *
 */

// Dependencies
const express = require ("express")






// ##################################
// Instant Variable
const app = express ()
const port = 3030


app.get ("/", (req, res) => res.send ("hello world"))






app.listen (port, () => console.log (`Express is running at port ${port}`))
