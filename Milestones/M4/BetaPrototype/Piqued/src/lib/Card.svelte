<script>
    import { TrendUp, MapPin, ThumbsUp, ChatCenteredText } from "phosphor-svelte"
    import { fade, fly } from 'svelte/transition';
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
    export let likes = 0;
    export let comments = 0;
    export let showLikes = false;
    export let showComments = false;

    export let index = 0;
</script>

<div class="card {horizontal ? 'horizontal' : ''}" in:fly="{{y: 10, duration: 500, delay: index * 100}}">
    {#if img}
    <a href="/#/article/{to}">
        <img style={horizontal ? "transform-origin: right;" : "transform-origin: bottom;"} src={img} alt="" loading="lazy">
    </a>
    {/if}
    <div class="card-body">
        {#if nearby || trending}
        <div class="card-badges">
            {#if nearby}
                <Tag type="badge" to="/#/search?by=badge&q=nearby"><MapPin size="{12}" weight="bold"/>Nearby</Tag>
            {/if}
            {#if trending}
                <Tag type="badge" to="/#/search?by=badge&q=trending"><TrendUp size="{12}" weight="bold"/>Trending</Tag>
            {/if}
        </div>
        {/if}
        <a href="/#/article/{to}" class="title"><h1>{title}</h1></a>
        <p>{description}</p>
        {#if tags.length !=0}
        <div class="card-tags">
            {#each tags as t}
                <Tag type="hashtag" to="/#/search?by=tag&q={t}">{t}</Tag>
            {/each}
        </div>
        {/if}
        {#if showLikes || showComments}
        <div class="like-comment-container">
            {#if showLikes}
                <div class="likes">
                    <ThumbsUp size={16} weight="bold"/>
                    {likes}
                </div>
            {/if}
            {#if showLikes && showComments}
                <div class="separator"></div>
            {/if}
            {#if showComments}
                <div class="comments">
                    <ChatCenteredText size={16} weight="bold"/>
                    {comments}
                </div>
            {/if}
        </div>
        {/if}

        <!-- <div class="readmore-button">
            <Button to="/#/article" type="text">Read More</Button>
        </div> -->
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
        height: min-content;
    }
    div.card.horizontal {
        flex-direction: row;
    }
    div.card.horizontal img {
        width: 30%;
        max-width: 340px;
        aspect-ratio: 16 / 9;
    }
    div.card.horizontal .card-body {
        width: auto;
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
        transition: transform 0.25s, filter 0.25s;
    }
    img:hover {
        transform: scale(1.1);
        filter: brightness(0.7)
    }
    a.title {
        color: var(--black);
        text-decoration: none;
    }
    a.title:hover {
        text-decoration: underline;
        color: var(--accent-red-700);
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
    .card-body p {
        display: -webkit-box;
        line-clamp: 3;
        -webkit-line-clamp: 3;
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
    .like-comment-container {
        display: flex;
        flex-direction: row;
        gap: 16px;
        margin-top: 16px;
    }
    .likes, .comments {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-family: var(--body-type);
    }
    
    .separator {
      display: inline-block;
      background-color: var(--gray-400);
      width: 1px;
      height: 24px;
    }
</style>
