<script>
    import Button from "../lib/Button.svelte";
    import Tag from "../lib/Tag.svelte";
    import Card from "../lib/Card.svelte";
    import { fly } from 'svelte/transition';

    import {link} from 'svelte-spa-router'
    import {location} from 'svelte-spa-router'
    import { username } from '../stores.js';

    console.log($location);

    // import active from 'svelte-spa-router/active'

    let userName = localStorage.getItem('username');

    // username.subscribe(value => {
    //         userName = value;
    // });
  </script>

<div class="biopage">
    <div class="main-account">
        <div class="account-image">
            <img src="../img/burger.jpg" alt="profile picture" width="300" height="200" loading="lazy">
        </div>
        <div class="info">
            <h2>{userName}</h2>
            <div class="info-section" id="contact">
                <p>Full name</p>
                <p>Email</p>
            </div>
        </div>
    </div>
    <div class="post-container">
        <ul class="tab-bar">
            <li><a href="/user/{userName}" use:link class={$location == `/user/${userName}` ? "active" : ""}>{userName}'s Posts</a></li>
            <li><a href="/user/{userName}#liked" use:link class={$location == `/user/${userName}#liked` ? "active" : ""}>Liked Posts</a></li>
        </ul>
        {#if $location == `/user/${userName}#liked`}
        <div class="articles" in:fly="{{x: 10, duration: 250, delay: 300}}" out:fly="{{x: 10, duration: 250}}">
            <Card></Card>
            <Card></Card>
        </div>
        {:else}
        <div class="articles" in:fly="{{x: -10, duration: 250, delay: 300}}" out:fly="{{x: -10, duration: 250}}">
            <Card></Card>
            <Card></Card>
        </div>
        {/if}
    </div>
</div>

<style>
    .biopage {
        display: grid;
        grid-template-columns: min-content auto;
        column-gap: 64px;
    }
    .main-account {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        background-color: var(--primary-orange-700);
        padding: 32px 64px;
        box-sizing: border-box;
        border-radius: 8px;
        height: min-content;
    }
    .account-image img {
        aspect-ratio: 1 / 1;
        width: 140px;
        height: 140px;
        object-fit: cover;
        border-radius: 50%;
    }
    .info {
        display: flex;
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }
    .info-section {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .tab-bar {
        display: flex;
        flex-direction: row;
        gap: 16px;
        margin: 0;
        padding: 0;
    }
    .tab-bar li {
        display: block;
        padding: 16px 8px 24px 8px;
        font-family: var(--display-type);
        font-size: 18px;
    }
    .tab-bar li a:not(.active) {
        text-decoration: none;
        color: var(--gray-600);
        transition: color 0.25s;
    }
    .tab-bar li a::after {
        content: '';
        height: 3px;
        display: block;
        transition: all 0.2s;
        border-radius: 3px;
        width: 100%;
        background-color: var(--accent-red-700);
        transform: scaleX(0);
    }
    .tab-bar li a:not(.active):hover::after {
        background-color: var(--accent-red-700);
        transform: scaleX(0.3);
    }
    .tab-bar a.active {
        text-decoration: none;
        color: var(--accent-red-700);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .tab-bar a.active::after {
        transform: scaleX(1);
        background-color: var(--accent-red-700);
        display: block;
    }
    .articles {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    @media screen and (max-width: 720px) {
        .biopage {
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: min-content auto;
            column-gap: 64px;
        }
        .main-account {
            flex-direction: row;
            margin-bottom: 32px;
            padding: 16px 32px;
        }
        .info {
            display: flex;
            flex-direction: column;
            gap: 16px;
            text-align: initial;
        }
        .account-image img { 
            width: 128px;
            height: 128px;
        }
    }
</style>