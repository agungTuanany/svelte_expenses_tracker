"use strict"
/*
 * Every single items in expenses trackers transaction
 *
 */

// Dependencies
const { Schema, model } = require ("mongoose")

// Instant variable
const dateNew = new Date ().getTime ()

const TransactionSchema = new Schema ({
    value   : {
        type        : Number,
        required    : true
    },
    date    : {
        type        : Number,
        default     : dateNew
    }
})

const Transaction = model ("transaction", TransactionSchema)

module.exports = Transaction
