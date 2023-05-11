<script>
    export let type = "tag"
    export let to = ""
</script>

{#if type == "badge"}
    <a href={to} class="badge">
        <slot></slot>
    </a>
{:else}
    <a href={to} class="hashtag">
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
    a.hashtag:hover, a.hashtag:focus{
        background-color: var(--primary-orange-900);
    }
    a.badge:hover, a.badge:focus{
        background-color: var(--accent-red-900);
    }
</style>