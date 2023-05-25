<script>
    export let type = "text";
    // export let placeholder;
    export let error = false;
    export let disabled = false;
    export let colorway = "regular"
    export let required = false;
    // export let iconLeft = false;
    // export let iconRight = false;
    
    let filled;

    export let textValue = "";

    export let elem = undefined;
</script>

<div>
    <label 
    class="field-container 
    {error ? "error" : ""}
    {colorway == "light" ? "light" : ""} 
    {disabled ? "disabled" : ""} 
    {type} 
    {(textValue != null && textValue.trim() != "") ? "filled" : ""}"
    >
        <span class="leading-icon">
            <slot name="leading-icon"></slot>
        </span>
        <span class="label">
            <slot></slot>
        </span>
        {#if type == "text"}
            <input type="text" bind:value={textValue} {disabled} bind:this={elem} on:change on:input on:focus on:blur {required}>
        {:else if type == "password"}
            <input type="password" bind:value={textValue} {disabled} bind:this={elem} on:change on:input on:focus on:blur {required}>
        {:else if type == "email"}
            <input type="email" bind:value={textValue} {disabled} bind:this={elem} on:change on:input on:focus on:blur {required}> 
        {:else if type == "date"}
            <input type="date" bind:value={textValue} {disabled} bind:this={elem} on:change on:input on:focus on:blur {required}> 
        {:else if type == "tel"}
            <input type="tel" bind:value={textValue} {disabled} bind:this={elem} on:change on:input on:focus on:blur {required}> 
        {:else if type == "time"}
            <input type="tel" bind:value={textValue} {disabled} bind:this={elem} on:change on:input on:focus on:blur {required}> 
        {:else} 
            <input bind:value={textValue} {disabled} bind:this={elem} on:change on:input on:focus on:blur {required}> 
        {/if}
        
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span class="trailing-icon" on:click>
            <slot name="trailing-icon"></slot>
        </span>
    </label>
    <!-- </label> -->
</div>

<style>
    .field-container.light {
        background-color: var(--primary-orange-100);
    }
    .field-container {
        height: 48px;
        padding: 0px 16px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 2px solid transparent;
        outline-offset: 2px;
        transition: border 0.25s, background-color 0.25s;
        font-family: var(--body-type);
        position: relative;
        background-color: var(--primary-orange-700);
        /* font-size: 16px; */
    }
    .field-container:hover {
        border: 2px solid var(--primary-orange-800);
    }
    .field-container:focus-within {
        border: 2px solid var(--accent-red-700);
        outline: 2px solid black;
        outline-offset: 0px;
    }
    .field-container.error {
        border: 2px dashed var(--error-red-700);
        background-color: var(--error-red-100);
        animation: bounce 0.2s 2 ease-in-out alternate;
    }
    .field-container .leading-icon {
        margin-right: 12px;
        color: var(--neutral-pink-400);
        transition: color 0.25s;
        display: inline-flex;
    }
    .field-container:focus-within .leading-icon, .field-container:focus-within .trailing-icon {
        color: var(--accent-red-900);
    }
    .field-container .leading-icon:empty {
        margin-right: 0px;
    }
    .field-container .trailing-icon {
        margin-left: 12px;
        color: var(--neutral-pink-400);
        transition: color 0.25s;
        display: inline-flex;
    }
    .field-container .trailing-icon:empty {
        margin-left: 0px;
    }
    .field-container.disabled {
        background-color: var(--neutral-pink-200);
        color: var(--neutral-pink-400);
        cursor: not-allowed;
    }
    .field-container.disabled:hover, .field-container.error.disabled {
        border: 2px solid transparent;
    }
    input {
        height: 100%;
        width: 100%;
        /* padding: 16px; */
        box-sizing: border-box;
        background-color: transparent;
        /* border-radius: 8px; */
        border: 0px solid transparent;
        outline-offset: 2px;
        transition: padding-top 0.25s;
        font-family: var(--body-type);
        font-size: 16px;
        display: inline-block;
        outline: none;
        color: var(--black)
    }
    .field-container:focus-within input, .field-container.filled input {
        padding-top: 16px;
    }
    .field-container.error.filled .label, .field-container.error:focus-within .label{
        color: var(--error-red-700);
    }
    .leading-icon:empty ~ .label {
        /* color: blue; */
        left: 16px;
    }
    .label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 52px;
        transition: top 0.25s, font-size 0.25s;
        font-weight: 500;
        user-select: none;
        color: var(--black);
    }

    .field-container:focus-within .label, .field-container.filled .label {
        top: 25%;
        font-size: 11px;
        color: var(--accent-red-700)
    }

    .field-container.date .label {
        opacity: 0;
    }
    .field-container.filled.date .label {
        opacity: 1;
    }

    .field-container.date:focus-within .label {
        opacity: 1;
    }

    .field-container.disabled .label {
        color: var(--neutral-pink-400);
    }
    
    .field-container.disabled input {
        color: var(--neutral-pink-400);
        cursor: not-allowed;
    }
    /* input:hover {
        border: 2px solid var(--primary-orange-800);
    }
    input:focus {
        border: 2px solid var(--accent-red-700);
    }
    input.error {
        border: 2px dashed var(--accent-red-700);
    } */
    
    ::placeholder {
        color: var(--gray-600);
    }
    @keyframes bounce {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.1);
        }
    }

    /* div:hover {

    } */
</style>