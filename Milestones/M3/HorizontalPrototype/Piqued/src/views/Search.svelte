<script>
    import Nav from "../lib/Navbar.svelte";
    import PageWithNav from "../layouts/PageWithNav.svelte";
    import Searchbar from "../lib/Searchbar.svelte";
    import {location, querystring} from 'svelte-spa-router'
    import {parse} from 'qs'

    import { onMount } from "svelte";

    let results = ""
    let searchTerm = ""
    $: pageHref = $querystring;

    window.addEventListener('hashchange', function() {
        console.log("HAsh change");
        let pageHref = $querystring;
        console.log("New Query", pageHref);
        const query = parse(pageHref, { ignoreQueryPrefix: true });
        if (query.by == "tag") {
            searchTerm = "#" + query.q.toString();
        } else {
            searchTerm = query.q.toString();
        }
        console.log(query);
        performSearch(query.by, query.q);
    });

    function performSearch(by, query) {

        // let pageHref = $querystring;
        console.log("Perform search", by, query);
        fetch(`/api/search?by=${by}&q=${query}`)
        .then(response => response.json())
        .then(json => {
            let resJson = JSON.stringify(json);
            console.log(resJson);
            results = resJson;
        })
        
        // let queries = pageHref.substring(pageHref.indexOf('?'));
        // console.log(queries)
        /*
        const query = parse(pageHref.substring(pageHref.indexOf('?')), { ignoreQueryPrefix: true });
        //searchTerm = query.q;
        console.log("Query" + query);
        fetch(`/api/search?by=${query.by}&q=${query.q}`)
        .then(response => response.json())
        .then(json => {
            let resJson = JSON.stringify(json);
            console.log(resJson);
            results = resJson;
        })*/
    }

    onMount(async () => {
        const query = parse($querystring);
        console.log("ON MOUNT: ", query);
        // searchTerm = `${query.q}`;
        if (query.by == "tag") {
            searchTerm = "#" + query.q.toString();
        } else {
            searchTerm = query.q.toString();
        }
        
        performSearch(query.by, query.q);
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


<div class="container">
    <div class="searchbar">
        <Searchbar onsubmit={() => {performSearch(searchTerm)}} bind:value={searchTerm}/>
    </div>
    <h1>Results</h1>
    {results}
</div>


<style>
    .container {
        padding-top: 64px;
        padding-bottom: 64px;
    }
    .searchbar {
        margin-bottom: 64px;
    }
</style>