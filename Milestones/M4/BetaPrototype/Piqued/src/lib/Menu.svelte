<script>
    import { fly } from 'svelte/transition';
    export let absolute = false;
    export let align = "bottomLeft"
    export let width = 360;
    let show = false;

    function toggleMenu() {
        show = !show;
        if (show) {
            document.body.addEventListener('click', toggleMenu);
        } else {
            document.body.removeEventListener('click', toggleMenu);
        }
    }
</script>

<div class="menu-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="menu-button" on:click|stopPropagation="{toggleMenu}">
        <slot name="menu-button"></slot>
    </div>

    {#if show}
    <div style="width: {width}px;" class="dropdown  {align}" transition:fly="{{y: -10, duration: 250}}" on:click|stopPropagation={()=>{}}>
        <slot name="dropdown"></slot>
    </div>
    {/if}

</div>

<style>
    .menu-container {
        position: relative;
    }
    .dropdown {
        padding: 8px;
        background-color: var(--primary-orange-700);
        box-shadow: 0px 4px 16px rgba(0,0,0,0.15);
        z-index: 10;
        border-radius: 8px;
    }
    .bottomRight {
        position: absolute;
        top: 100%;
        right: 0;
    }
    .bottomLeft {
        position: absolute;
        top: 100%;
        left: 0;
    }
</style>

