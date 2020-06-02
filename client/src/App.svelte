<script>
    // Dependencies
    import axios from "axios"
    import { onMount } from "svelte"


    // ###############################################
    // Declared variable
    let input = 0
    let typeOfTransaction = "+"
    let transactions = []

    // ###############################################
    onMount (async () => {
        try {
            const { data } = await axios.get ("api/transactions")
            console.log ("data transaction", data)
            transactions = data
        }
        catch (err) {
            console.log ("onMount error: ", err)
        }
    })
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
            <button class="button">
                Save
            </button>
        </p>
    </div>
    <p>{input}</p>
    <h1>{typeOfTransaction}</h1>
    {JSON.stringify (transactions)}
</div>
