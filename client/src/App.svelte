<script>
    // Dependencies
    import axios        from "axios"
    import { onMount }  from "svelte"

    // ## Build in dependencies
    import Transactions from "./components/Transactions.svelte"
    import SummaryCard  from "./components/SummaryCard.svelte"

    // ###############################################
    // Declared variable
    let input = 0
    let typeOfTransaction = "+"
    let transactions = []


    // ## Reactive assignment | statement ##
    // Every time input changes "$: disabled" will be updated
    // If user put a value 0  or If user not put a value or blank the button should disabled
    //$: disabled = input === 0 | input === undefined
    $: disabled = !input

    // Sum of value on every transaction
    $: balance = transactions.reduce ((accumulator, transaction) => accumulator + transaction.value, 0)

    $: income = transactions
        .filter (transaction => transaction.value > 0)
        .reduce ((accumulator, transaction) => accumulator + transaction.value, 0)

    $: expenses = transactions
        .filter (transaction => transaction.value < 0)
        .reduce ((accumulator, transaction) => accumulator + transaction.value, 0)

    // ###############################################
    onMount (async () => {
        try {
            const { data } = await axios.get ("/api/transactions")
            console.log ("data transaction", data)
            transactions = data
        }
        catch (err) {
            console.log ("onMount error: ", err)
        }
    })

    async function addTransaction () {
        const transaction = {
            date    : new Date ().getTime (),
            value   : typeOfTransaction === "+" ? input : input * - 1
        }

        const response = await axios.post ("/api/transactions", transaction)
        transactions = [response.data, ...transactions]
        input = 0
    }

    async function removeTransaction (id) {
        const response = await axios.delete ("/api/transactions/" + id)

        if (response.data.id === id) {
            transactions = transactions.filter (t => t._id !== id)
        }
    }
</script>

<style type="text/css" media="all">
    .app {
        margin      : 40px auto;
        max-width   : 500px;
    }
</style>

<div class="app container">
    <div class="field has-addons">
        <p class="control">
            <span class="select">
                <select bind:value={typeOfTransaction}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                </select>
            </span>
        </p>
        <p class="control is-expanded">
            <input class="input" type="number" bind:value={input} placeholder="Amount of money">
        </p>
        <p class="control">
            <button class="button" on:click={addTransaction} disabled={disabled}>
                Save
            </button>
        </p>
    </div>

    <!-- Balance columns -->
    <SummaryCard mode="balance"  value={balance}/>

    <!-- Income and Expenses columns -->
    <div class="columns">
        <div class="column">
            <SummaryCard mode="income"  value={income}/>
        </div>
        <div class="column">
            <SummaryCard mode="expenses"  value={expenses}/>
        </div>
    </div>
    <hr>

    {#each transactions as transaction (transaction._id)}
        <Transactions  transaction={transaction} removeTransaction={removeTransaction}/>
     {/each}
</div>
