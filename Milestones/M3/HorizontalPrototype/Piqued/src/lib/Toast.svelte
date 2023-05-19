<script>
    import { fly } from 'svelte/transition';
    import { Info,  Warning, WarningOctagon } from 'phosphor-svelte';
    export let type = "info"
    export let delay = 3000
</script>

<div class="toast {type == "error" ? "error": type == "warning" ? "warning" : ""}" 
    in:fly="{{x: 10, duration: 500, delay: delay}}" out:fly="{{x: 10, duration: 500}}">
    <div class="icon">
        {#if type == "error"}
            <WarningOctagon size={32} weight="bold"/>
        {:else if type == "warning"}
            <Warning size={32} weight="bold" />
        {:else} 
            <Info size={32} weight="bold" />
        {/if}
    </div>
    
    <div class="title">
        <slot name="message"></slot>
    </div>
</div>

<style>
    .toast {
        position: fixed;
        top: calc(var(--header-height) + 32px);
        right: 32px;
        background-color: var(--accent-red-700);
        color: white;
        box-shadow: 0px 4px 8px rgb(0,0,0,0.2);
        display: grid;
        grid-template-columns: min-content auto;
        /* align-content: center; */
        border-radius: 8px;
        overflow: hidden;
        max-width: 400px;
        z-index: 20;
    }
    .toast.error {
        background-color: var(--error-red-100);
        color: var(--error-red-700);
    }
    .toast.error .icon {
        background-color: var(--error-red-700);
        color: white;
    }
    .toast.warning {
        background-color: var(--primary-orange-700);
        color: var(--black);
    }
    .toast.warning .icon {
        background-color: var(--primary-orange-900);
        color: var(--black);
    }
    .icon {
        display: flex;
        padding: 16px;
        background-color: var(--accent-red-800);
        justify-self: stretch;
        align-items: center;  
    }
    .title {
        padding: 16px;
        align-self: center;
    }
</style>

