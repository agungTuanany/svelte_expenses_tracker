"use strict"
/*
 * All the logic Transaction API response
 */

// Dependencies
const { Router }  = require("express")
const Transaction = require("./../models/Transaction")

// Instant Variable
const router = Router()

// Home route
router.get("/", async (req, res) => {

    try {
        const transactions = await Transaction.find()

        if (!transactions) {
            throw new Error("No Transaction declare")
        }
        // response success
        res.status(200).json(transactions)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post("/", async (req, res) => {

    const { value, date } = req.body
    const newTransaction = new Transaction({ value, date })

    try {
        const transaction = await newTransaction.save()

        if (!transaction) {
            throw new Error ("There was an error saving the transaction, please try again")
        }
        // response success
        res.status(200).json(transaction)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete("/:id", async (req, res) => {

    const { id } = req.params
    try {
        const transaction = Transaction.findById(id)

        if (!transaction) {
            throw new Error("No transaction to be DELETED was found")
        }
        // response success
        const removed = await transaction.remove ()
        if (!removed) {
            throw new Error("There was a problem DELETING the transaction")
        }
        res.status(200).json({ id })
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
})

module.exports = router
