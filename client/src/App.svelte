<script>
    // Dependencies
    import axios        from "axios"
    import { onMount }  from "svelte"

    // ## Build in dependencies
    import Transactions from "./components/Transactions.svelte"
    import SummaryCard  from "./components/SummaryCard.svelte"
    import Loading      from "./components/Loading.svelte"
    import { transactions, sortedTransactions, balance, income, expenses  } from "./stores/transactionStore.js"

    // ###############################################
    // Declared variable
    let input = 0
    let typeOfTransaction = "+"
    //let transactions = []
    let loading =false


    // ## Reactive assignment | statement ##
    // Every time input changes "$: disabled" will be updated
    // If user put a value 0  or If user not put a value or blank the button should disabled
    //$: disabled = input === 0 | input === undefined
    $: disabled = !input

    // ###############################################
    onMount (async () => {
        try {
            loading = true
            const { data } = await axios.get("/api/transactions")
            // console.log("data transaction", data)
            $transactions = data
            loading = false
        }
        catch (err) {
            loading = false
            console.log("onMount error: ", err)
        }
    })

    async function addTransaction() {
        const transaction = {
            date    : new Date().getTime(),
            value   : typeOfTransaction === "+" ? input : input * - 1
        }

        const response = await axios.post("/api/transactions", transaction)
        $transactions = [response.data, ...$transactions]
        input = 0
    }

    async function removeTransaction (id) {
        const response = await axios.delete("/api/transactions/" + id)

        if (response.data.id === id) {
            $transactions = $transactions.filter (t => t._id !== id)
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

    {#if loading}
    <Loading />
    {/if}

    {#if $transactions.length > 0}
        <!-- Balance columns -->
        <SummaryCard mode="balance" value={$balance}/>

        <!-- Income and Expenses columns -->
        <div class="columns">
            <div class="column">
                <SummaryCard mode="income" value={$income}/>
            </div>
            <div class="column">
                <SummaryCard mode="expenses" value={$expenses}/>
            </div>
        </div>
        <hr>
    {:else if !loading}
        <div class="notification">
            add Your first transaction
        </div>
    {/if}


    {#each $sortedTransactions as transaction (transaction._id)}
        <Transactions  transaction={transaction} removeTransaction={removeTransaction}/>
    {/each}
</div>
