<script>
    export let to = "";

</script>

<a on:click class="menu-entry" href={to == "" ? "javascript:void(0)" : to}>
    <div class="left">
        <slot name="leading-icon"></slot>
        <slot></slot>
    </div>
    <slot name="trailing-icon"></slot>
</a>

<style>
    a {
        padding: 8px 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-family: var(--body-type);
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        color: var(--black);
        border-radius: 6px;
        transition: background-color 0.25s;
    }
    a:hover, a:focus {
        background-color: var(--primary-orange-800);
    }
    a .left{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
    }
    

</style>