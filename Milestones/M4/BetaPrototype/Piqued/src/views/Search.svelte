<script>
    import Searchbar from "../lib/Searchbar.svelte";
    import Card from "../lib/Card.svelte";
    import {location, querystring} from 'svelte-spa-router'
    import {parse} from 'qs'
    import {fade} from 'svelte/transition'

    import { onMount } from "svelte";

    let resultsMessage = ""
    let resultsData = []
    let searchTerm = ""
    let loading = true;
    $: pageHref = $querystring;

    const cardData = {
        card1: {
            title: "Burgers",
            nearby: false,
            trending: false,
            description: "We went to every burger joint in SF and ranked them. These are the results. Lorem ipsum dolor sit amet.",
            tags: ["burger", "sf", "bayarea"],
            to: "/", 
            img: "../img/burger.jpg",
        },
        card2: {
            title: "Places to visit in Napa",
            nearby: true,
            trending: true,
            description: "Planning a daytrip to Napa? Here are some perfect places to go",
            tags: ["napa", "sf", "bayarea"],
            to: "/", 
            img: "../img/grapes.jpg",
        },
        card3: {
            title: "Movies you should be watching.",
            nearby: false,
            trending: true,
            description: "These are some of the best movies based on box office sales. ",
            tags: [],
            to: "/", 
            img: "../img/movie.jpg",
        }
    }

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
        loading = true;
        // let pageHref = $querystring;
        console.log("Perform search", by, query);
        fetch(`/api/search?by=${by}&q=${query}`)
            .then(response => response.json())
            .then(json => {
               // let resJson = JSON.stringify(json);
               // results = resJson;
                resultsMessage = json.message;
                resultsData = json.results;
                loading = false;
            })
        console.log(resultsData);
        // setTimeout(() => {
        //     fetch(`/api/search?by=${by}&q=${query}`)
        //     .then(response => response.json())
        //     .then(json => {
        //        // let resJson = JSON.stringify(json);
        //        // results = resJson;
        //         results = json.message;
        //         loading = false;
        //     })
        // } , 2000);
        
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
    {#if loading}
        <div class="skeleton-loader" transition:fade>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <!-- <div class="card">
            <Card {...cardData.card1} horizontal/>
            <Card {...cardData.card2} horizontal/>
            <Card {...cardData.card3} horizontal/>
        </div> -->
    {:else}
        <p>{resultsMessage}</p>
        <div class="results-container">
            {#each resultsData as res, i}
                <Card  
                title = {res.title}
                description = {res.body}
                tags = {res.hashtags.split(",")}
                to = "/"
                index = {i}
                showLikes
                showComments
                horizontal/>
            {/each}
        </div>
    {/if}
</div>


<style>
    .container h1 {
        margin-bottom: 32px;
    }
    .searchbar {
        margin-bottom: 64px;
        padding: 0px 64px;
    }
    .skeleton-loader {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 16px;
    }
    .skeleton-loader div {
        height: 128px;
        background-image: linear-gradient(to right, var(--primary-orange-700) 0%, var(--neutral-pink-200) 47%, var(--neutral-pink-200) 53%, var(--primary-orange-700) 100%);
        background-size: 200% 100%;
        animation: skeleton 3s infinite linear;
        border-radius: 8px;
    }
    .results-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    p {
        margin-block-start: 32px;
        margin-block-end: 32px;
    }
    @keyframes skeleton{
        0% {
            background-position: 200% 0%;
        }
        100% {
            background-position: -200% -0%;
        }
    }
    @media screen and (max-width: 720px) {
        .searchbar {
            padding: 0px 16px;
        }
    }
</style>