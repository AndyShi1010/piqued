<script>
    export let type = "tag"
    export let to = ""
    export let disabled
</script>

{#if type == "badge"}
    <a href={to == "" ? "javascript:void(0)" : to} class="badge {disabled ? "disabled" : ""}">
        <slot></slot>
    </a>
{:else}
    <a href={to == "" ? "javascript:void(0)" : to} class="hashtag {disabled ? "disabled" : ""}">
        #<slot></slot>
    </a>
{/if}

<style>
    a {
        padding: 6px 8px;
        font-size: 12px;
        border-radius: 4px;
        font-family: var(--body-type);
        text-decoration: none;
        line-height: 1;
        transition: background-color 0.25s;
        height: min-content;
        width: min-content;
        white-space: nowrap;
        display: block;
    }
    a.badge {
        background-color: var(--accent-red-700);
        color: white;
        display: flex;
        flex-direction: row;
        gap: 6px;
    }
    a.hashtag {
        background-color: var(--primary-orange-800);
        color: var(--accent-red-900);
    }
    a.hashtag:not(.disabled):hover, a.hashtag:not(.disabled):focus{
        background-color: var(--primary-orange-900);
    }
    a.badge:hover, a.badge:focus{
        background-color: var(--accent-red-900);
    }
    a.hashtag.disabled, a.badge.disabled {
        cursor: initial;
    }
</style>