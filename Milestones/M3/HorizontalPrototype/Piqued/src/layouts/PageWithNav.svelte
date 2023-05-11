<script>
    import { fade } from 'svelte/transition';
    import Router, {location, link} from 'svelte-spa-router';
    import Navbar from '../lib/Navbar.svelte';
    export let routerComponent;
	export let routes;
</script>

<Navbar />
<div class="padded-page">
    <svelte:component this={routerComponent} {routes} on:routeLoaded/>
</div>


<style>
    .padded-page {
        padding-top: calc(var(--header-height) + 64px);
        padding-bottom: 64px;
        /* background-color: var(--secondary-accent-tint); */
        height: 100%;
        min-height: calc(100vh - var(--header-height));
        width: var(--page-width);
        margin: 0px auto;
    }

    @media screen and (min-width: 1920px) {
        .padded-page {
            width: 1280px;
        }
    }
    @media screen and (max-width: 720px) {
        .padded-page {
            width: 90%;
        }
    }
</style>
