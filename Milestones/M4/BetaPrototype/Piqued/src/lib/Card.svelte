<script>
    import { TrendUp, MapPin } from "phosphor-svelte"
    import { fade } from 'svelte/transition';
    import Button from "./Button.svelte";
    import Tag from "./Tag.svelte";

    export let title;
    export let nearby = false;
    export let trending = false;
    export let description;
    export let tags = [];
    export let to;
    export let img;
    export let horizontal = false;

    export let index = 0;
</script>

<div class="card {horizontal ? 'horizontal' : ''}" in:fade="{{duration: 500, delay: index * 100}}">
    <img src={img} alt="" loading="lazy">
    <div class="card-body">
        {#if nearby || trending}
        <div class="card-badges">
            {#if nearby}
                <Tag type="badge"><MapPin size="{12}" weight="bold"/>Nearby</Tag>
            {/if}
            {#if trending}
                <Tag type="badge"><TrendUp size="{12}" weight="bold"/>Trending</Tag>
            {/if}
        </div>
        {/if}
        <h1>{title}</h1>
        <p>{description}</p>
        {#if tags.length !=0}
        <div class="card-tags">
            {#each tags as t}
                <Tag type="hashtag" to="/#/search?by=tag&q={t}">{t}</Tag>
            {/each}
        </div>
        {/if}
        <div class="readmore-button">
            <Button to="/#/article" type="text">Read More</Button>
        </div>
        <!-- <a class="card-link" href={to}>Read More</a> -->
    </div>
</div>

<style>
    div.card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    div.card.horizontal {
        flex-direction: row;
    }
    div.card.horizontal img {
        width: 50%;
        max-width: 340px;
        aspect-ratio: 16 / 9;
    }
    div.card.horizontal .card-body {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    div.card-body {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .card-badges {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
    }
    img {
        width: 100%;
        display: block;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }
    h1 {
        margin: 0;
        /* margin-bottom: 8px; */
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
        /* margin-top: 8px; */
    }
    .readmore-button {
        margin-left: auto;
        display: block;
        width: fit-content;
    }
</style>
