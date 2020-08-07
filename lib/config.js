"use strict"
/*
 * Create and export configuration variables
 *
 */
// Dependencies
const env = require("./../.env.js")

// Instant variable
const environments = {}

// Staging (default) environment
environments.staging = {
    "port"      : 3030,
    "envName"   : "staging",
    "mongoURI"  : env.mongoURI_TOKEN

}

// Production environment
environments.production = {
    "port"      : 6073,
    "envName"   : "production",
    "mongoURI"  : env.mongoURI_TOKEN
}

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof (process.env.NODE_ENV) === "string" ? process.env.NODE_ENV.toLowerCase() : ""

// check that the current environments is one of the environment list, if not, default to staging
const environmentToExport = typeof (environments[currentEnvironment]) === "object" ? environments[currentEnvironment] : environments.staging

// Export the module
module.exports = environmentToExport

