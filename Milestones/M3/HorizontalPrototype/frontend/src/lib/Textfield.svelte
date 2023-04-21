<script>
    export let type = "text";
    export let placeholder;
</script>

<div>
    <div class="field-container">
        <input {type} {placeholder}>
    </div>
</div>

<style>
    input {
        height: 48px;
        padding: 16px;
        box-sizing: border-box;
        background-color: var(--primary-orange-700);
        border-radius: 8px;
        border: 2px solid transparent;
        outline-offset: 2px;
    }
    input:hover {
        border: 2px solid var(--primary-orange-800);
    }
    input:focus {
        border: 2px solid var(--accent-red-700);
    }

    /* div:hover {

    } */
</style>