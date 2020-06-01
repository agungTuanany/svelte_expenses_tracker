<script charset="utf-8">
    // Declared variable
    let input = 0
    let typeOfTransaction = "+"
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
</div>
