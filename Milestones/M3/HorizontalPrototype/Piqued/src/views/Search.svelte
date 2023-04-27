<script>
    import Nav from "../lib/Navbar.svelte";
    import PaddedPage from "../layouts/PaddedPage.svelte";
    import Searchbar from "../lib/Searchbar.svelte";
    import {location, querystring} from 'svelte-spa-router'
    import {parse} from 'qs'

    import { onMount } from "svelte";

    onMount(async () => {
        const query = parse($querystring);
        console.log(query);
        //console.log(queryString.get('by'), queryString.get('q'));
        let res = fetch(`/api/search?by=${query.by}&q=${query.q}`);
        console.log(res);
    })
</script>

<Nav />
<PaddedPage>
    <div class="container">
        <div class="searchbar">
            <Searchbar />
        </div>
        <h1>Results</h1>
    </div>
</PaddedPage>

<style>
    .container {
        padding-top: 64px;
        padding-bottom: 64px;
    }
    .searchbar {
        margin-bottom: 64px;
    }
</style>