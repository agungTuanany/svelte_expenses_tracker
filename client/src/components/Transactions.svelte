<!--
    Svelte components: every single transactions
-->
<script>
    // ## Dependencies ##
    import { slide } from "svelte/transition"

    // ## Props variables ##
    export let transaction
    export let removeTransaction
</script>

<style>
    .date {
        float: right;
    }

</style>

<div class="notification is-light {transaction.value > 0 ? "is-success" : "is-danger"}" transition:slide={{ duration: 1000 }}>
    {transaction.value}
    <span class="is-size-7 has-text-grey date">
        {new Date(transaction.date).toLocaleString()}
    </span>
    <button class="delete" on:click={() => removeTransaction(transaction._id)}></button>
</div>
