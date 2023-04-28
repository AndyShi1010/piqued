<script>
    import Nav from "../lib/Navbar.svelte";
    import PaddedPage from "../layouts/PaddedPage.svelte";
    import Searchbar from "../lib/Searchbar.svelte";
    import {location, querystring} from 'svelte-spa-router'
    import {parse} from 'qs'

    import { onMount } from "svelte";

    let results = ""
    let searchTerm = ""

    function performSearch() {
        console.log("Perform search")
        let pageHref = window.location.href;
        console.log(pageHref);
        // let queries = pageHref.substring(pageHref.indexOf('?'));
        // console.log(queries)
        const query = parse(pageHref.substring(pageHref.indexOf('?')), { ignoreQueryPrefix: true });
        searchTerm = query.q;
        console.log(query);
        fetch(`/api/search?by=${query.by}&q=${query.q}`)
        .then(response => response.json())
        .then(json => {
            let resJson = JSON.stringify(json);
            console.log(resJson);
            results = resJson;
        })
    }

    onMount(async () => {
        const query = parse($querystring);
        console.log(query);
        performSearch();
        //console.log(queryString.get('by'), queryString.get('q'));
        // let res = await fetch(`/api/search?by=${query.by}&q=${query.q}`, 
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json',
        //         }
        //     }
        // )
        // .then(result => {
        //     console.log(result);
        // });
        //console.log(res);
    })
</script>

<Nav />
<PaddedPage>
    <div class="container">
        <div class="searchbar">
            <Searchbar pageAction={performSearch} value={searchTerm}/>
        </div>
        <h1>Results</h1>
        {results}
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