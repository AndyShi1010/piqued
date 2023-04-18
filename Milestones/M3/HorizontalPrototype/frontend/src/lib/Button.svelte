<script>
    export let to;
    export let type = "primary";
    export let disabled = false;
    export let icon;
</script>

{#if type == "secondary"}
    <a style={icon == "iconLeft" ? "padding: 6px 16px 6px 12px; gap: 8px; flex-direction: row": icon == "iconRight" ? "padding: 6px 12px 6px 16px; gap: 8px; flex-direction: row-reverse;" : "padding: 6px 16px;"} href={disabled ? "javascript:void(0)": to} class="btn-secondary {disabled ? 'disabled' : ''}">
        <slot></slot>
    </a>    
{:else if type == "text"}
    <a style={icon == "iconLeft" ? "padding: 6px 16px 6px 12px; gap: 8px; flex-direction: row": icon == "iconRight" ? "padding: 6px 12px 6px 16px; gap: 8px; flex-direction: row-reverse;" : "padding: 6px 16px;"} href={disabled ? "javascript:void(0)": to} class="btn-text {disabled ? 'disabled' : ''}">
        <slot></slot>
    </a> 
{:else}
    <a style={icon == "iconLeft" ? "padding: 6px 16px 6px 12px; gap: 8px; flex-direction: row": icon == "iconRight" ? "padding: 6px 12px 6px 16px; gap: 8px; flex-direction: row-reverse;" : "padding: 6px 16px;"} href={disabled ? "javascript:void(0)": to} class="btn-primary {disabled ? 'disabled' : ''}">
        <slot></slot>
    </a>
{/if}


<style>
    a {
        border-radius: 8px;
        font-family: var(--display-type);
        font-size: 16px;
        text-decoration: none;
        transition: background-color 0.25s, border 0.25s, color 0.25s, box-shadow 0.25s;
        position: relative;
        display: flex;
    }    
    .btn-primary {
        background-color: var(--accent-red-700);
        color: white;
    }
    .btn-primary:hover {
        color: var(--primary-orange-700);
        background-color: var(--accent-red-800);
    }
    .btn-primary:focus {
        color: var(--primary-orange-700);
        background-color: var(--accent-red-800);
        box-shadow: 0px 0px 0px 2px var(--accent-red-900);
        /* border: 2px solid var(--accent-red-900); */
    }

    .btn-primary.disabled, .btn-primary.disabled:hover, .btn-primary.disabled:focus  {
        color: var(--neutral-pink-400);
        background-color: var(--neutral-pink-200);
        pointer-events: none;
    }

    .btn-secondary {
        background-color: transparent;
        box-shadow: inset 0px 0px 0px 2px var(--accent-red-700);
        /* border: 2px solid var(--accent-red-700); */
        color: var(--accent-red-700);
    }
    .btn-secondary:hover {
        color: var(--accent-red-800);
        background-color: var(--primary-orange-700);
        box-shadow: inset 0px 0px 0px 2px var(--accent-red-800);
    }
    .btn-secondary:focus {
        color: var(--accent-red-800);
        background-color: var(--primary-orange-800);
        box-shadow: inset 0px 0px 0px 2px var(--accent-red-800);
        /* border: 2px solid var(--accent-red-900); */
    }
    .btn-secondary.disabled, .btn-secondary.disabled:hover, .btn-secondary.disabled:focus {
        color: var(--neutral-pink-300);
        background-color: transparent;
        box-shadow: inset 0px 0px 0px 2px var(--neutral-pink-200);
        pointer-events: none;
    }

    .btn-text {
        background-color: transparent;
        /* border: 2px solid var(--accent-red-700); */
        color: var(--accent-red-700);
    }
    .btn-text:hover {
        background-color: var(--primary-orange-800);
    }
    .btn-text:focus {
        color: var(--accent-red-800);
        background-color: var(--primary-orange-800);
        box-shadow: inset 0px 0px 0px 2px var(--accent-red-800);
        /* border: 2px solid var(--accent-red-900); */
    }
    .btn-text.disabled, .btn-secondary.disabled:hover, .btn-secondary.disabled:focus {
        color: var(--neutral-pink-300);
        background-color: transparent;
        pointer-events: none;
    }

    
</style>