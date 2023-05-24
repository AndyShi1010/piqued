<script>
    export let to = "";
    export let type = "primary";
    export let disabled = false;
    export let icon = "none";
</script>

{#if type == "secondary"}
    <a 
        on:click 
        style={icon == "iconLeft" ? "padding: 8px 16px 8px 12px; gap: 8px; flex-direction: row": icon == "iconRight" ? "padding: 8px 12px 8px 16px; gap: 8px; flex-direction: row-reverse;" : icon == "iconOnly" ? "padding: 8px 8px;" : "padding: 8px 16px;"} 
        href={disabled ? "javascript:void(0)": to == "" ? "javascript:void(0)" : to} 
        class="btn-secondary {disabled ? 'disabled' : ''}" 
        tabindex="{disabled ? -1 : 0}">
        <slot></slot>
    </a>    
{:else if type == "text"}
    <a 
        on:click 
        style={icon == "iconLeft" ? "padding: 8px 16px 8px 12px; gap: 8px; flex-direction: row": icon == "iconRight" ? "padding: 8px 12px 8px 16px; gap: 8px; flex-direction: row-reverse;" : icon == "iconOnly" ? "padding: 8px 8px;" : "padding: 8px 16px;"} 
        href={disabled ? "javascript:void(0)": to == "" ? "javascript:void(0)" : to}
        class="btn-text {disabled ? 'disabled' : ''}" 
        tabindex="{disabled ? -1 : 0}">
        <slot></slot>
    </a> 
{:else}
    <a 
        on:click 
        style={icon == "iconLeft" ? "padding: 8px 16px 8px 12px; gap: 8px; flex-direction: row": icon == "iconRight" ? "padding: 8px 12px 8px 16px; gap: 8px; flex-direction: row-reverse;" : icon == "iconOnly" ? "padding: 8px 8px;" : "padding: 8px 16px;"} 
        href={disabled ? "javascript:void(0)": to == "" ? "javascript:void(0)" : to} 
        class="btn-primary {disabled ? 'disabled' : ''}" 
        tabindex="{disabled ? -1 : 0}">
        <slot></slot>
    </a>
{/if}


<style>
    a {
        border-radius: 8px;
        font-family: var(--display-type);
        font-size: 16px;
        text-decoration: none;
        transition: background-color 0.25s, border 0.25s, color 0.25s, box-shadow 0.15s;
        position: relative;
        display: flex;
        align-items: center;
        width: min-content;
        height: min-content;
        white-space: nowrap;
        cursor: pointer;
    }    
    .btn-primary {
        background-color: var(--accent-red-700);
        color: white;
        box-shadow: inset 0px 1px 1px rgba(255,255,255,0.5), inset 0px -1px 1px rgba(0,0,0,0.2),0px 1px 1px rgba(0,0,0,0.2)
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
        cursor: not-allowed;
        box-shadow: none;
    }

    .btn-secondary {
        background-color: transparent;
        box-shadow: inset 0px 0px 0px 2px var(--accent-red-700);
        /* border: 2px solid var(--accent-red-700); */
        color: var(--accent-red-700);
    }
    .btn-secondary:hover {
        color: var(--accent-red-800);
        background-color: var(--primary-orange-800);
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