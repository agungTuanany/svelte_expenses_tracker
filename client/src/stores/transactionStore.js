"use strict"
/*
 * transaction store
 *
 */

import { writable, derived } from "svelte/store"

export const transactions = writable ([])

// Showing the latest transaction first.
export const sortedTransactions = derived (transactions, (value) => value.sort ((a, b) => b.date - a.date))

// Sum of value on every transaction
export const balance = derived (transactions, (value) => value.reduce ((accumulator, transaction) => accumulator = transaction.value, 0))

export const income = derived (transactions,
    (value) => value.filter (transaction => transaction.value > 0)
    .reduce ((accumulator, transaction) => accumulator = transaction.value, 0))

export const expenses = derived (transactions,
    (value) => value.filter (transaction => transaction.value < 0)
    .reduce ((accumulator, transaction) => accumulator = transaction.value, 0))

