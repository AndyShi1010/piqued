<script>
    import { TrendUp, MapPin } from "phosphor-svelte"

    export let title;
    export let nearby = false;
    export let trending = false;
    export let description;
    export let tags = [];
    export let to;
    export let img;
</script>

<div class="card">
    <img src={img} alt="">
    <div class="card-body">
        {#if nearby || trending}
        <div class="card-badges">
            {#if nearby}
            <span class="badge"><MapPin size="{12}" weight="bold"/>Nearby</span>
            {/if}
            {#if trending}
                <span class="badge"><TrendUp size="{12}" weight="bold"/>Trending</span>
            {/if}
        </div>
        {/if}
        <h1>{title}</h1>
        <p>{description}</p>
        {#if tags.length !=0}
        <div class="card-tags">
            {#each tags as t}
                <a class="card-tag">#{t}</a>
            {/each}
        </div>
        {/if}
        <a class="card-link" href={to}>Read More</a>
    </div>
</div>

<style>
    div.card {
        background-color: white;
        border-radius: 6px;
        box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.1);
    }
    div.card-body {
        padding: 24px;
    }
    .card-badges {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
    }
    .badge {
        font-family: var(--body-type);
        background-color: var(--primary-accent);
        color: white;
        font-size: 12px;
        padding: 6px;
        border-radius: 4px;
        line-height: 1;
        display: inline-flex;
        gap: 6px;
    }
    img {
        width: 100%;
        display: block;
        border-radius: 6px 6px 0px 0px;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }
    h1 {
        margin: 0;
        margin-bottom: 8px;
        font-family: var(--display-type);
        font-size: 24px;
        line-height: 1.25;
    }
    p {
        margin: 0;
        font-family: var(--body-type);
    }
    .card-tags {
        display: flex;
        gap: 8px;
        margin-top: 8px;
    }
    a.card-tag {
        font-family: var(--body-type);
        background-color: var(--secondary-accent);
        color: var(--primary-accent);
        font-size: 12px;
        padding: 6px;
        border-radius: 4px;
        line-height: 1;
    }
    a.card-link {
        font-family: var(--display-type);
        font-size: 16px;
        text-decoration: none;
        color: var(--primary-accent);
        margin-left: auto;
        display: block;
        margin-top: 8px;
        width: max-content;
        padding: 6px 12px;
        border-radius: 6px;
        transition: background-color 0.25s;
    }
    a.card-link:hover {
        background-color: var(--secondary-accent);
    }
</style>