<!--
    Svelte component: every single columns
-->
<script>
    // ## Props variables ##
    export let value = 0
    export let mode = "balance"

    // ## Reactive statement
    $: label = mode.toUpperCase ()
    $: cssClass = getCssCLass (mode)

    function getCssCLass (mode) {
        switch (mode) {
            case 'balance':
                return "is-info"
            case "income":
                return "is-success"
            case "expenses":
                return "is-danger"
        }
    }
</script>




<div class="notification {cssClass} is-light has-text-centered">
    {label}: <strong>{value}</strong>
</div>
