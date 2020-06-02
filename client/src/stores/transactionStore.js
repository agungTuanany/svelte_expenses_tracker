"use strict"
/*
 * transaction store
 *
 */

import { writable } from "svelte/store"

export const transactions = writable ([])
