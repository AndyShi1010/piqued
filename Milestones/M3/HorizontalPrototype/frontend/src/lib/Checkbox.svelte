<script>
    import { Check } from 'phosphor-svelte'
    export let disabled = false;
    export let checked = false;
</script>

<label class="container">
    <input type="checkbox" {disabled} bind:checked={checked}>
    <span class="checkmark">
        <span><Check size="{20}" weight="bold"/></span>
    </span>
    <slot></slot>
</label>

<style>
    label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }
    .checkmark {
        width: 20px;
        min-width: 20px;
        min-height: 20px;
        height: 20px;
        border: 2px solid var(--accent-red-700);
        border-radius: 4px;
        display: block;
        cursor: pointer;
        transform: scale(1);
        transition: transform 0.15s, background-color 0.25s, border 0.25s;
        transition-timing-function: ease-out;
        position: relative;
    }
    .checkmark > span {
        color: white;
        opacity: 0;
        display: block;
        transform: scale(0);
        transform-origin: 25% 75%;
        transition: transform 0.15s, opacity 0.25s;
        position: absolute;
        top: 0;
        left: 0;
    }
    .checkmark:hover {
        background-color: var(--primary-orange-800);
    }
    label:active > input:not(:disabled) ~ .checkmark {
        transform: scale(0.8);
    }
    input {
        position: absolute;
        /* display: none; */
        opacity: 0;
        visibility: hidden;
    }
    input:checked ~ .checkmark {
        background-color: var(--accent-red-700);
        color: white;
    }
    input:checked ~ .checkmark:hover {
        background-color: var(--accent-red-800);
        border: 2px solid var(--accent-red-800);
    }
    input:checked ~ .checkmark > span {
        opacity: 1;
        transform: scale(1);
    }
    input:disabled ~ .checkmark {
        background-color: transparent;
        border: 2px solid var(--neutral-pink-200);
        cursor: not-allowed;
    }
    input:checked:disabled ~ .checkmark {
        background-color: var(--neutral-pink-200);
        border: 2px solid var(--neutral-pink-200);
        cursor: not-allowed;
    }

    input:checked:disabled ~ .checkmark > span {
        color: var(--neutral-pink-400);
    }
</style>