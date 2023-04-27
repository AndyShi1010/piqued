<script>
    import Searchbar from "../lib/Searchbar.svelte";
    import Card from "../lib/Card.svelte";
    import Nav from "../lib/Navbar.svelte";
    import PaddedPage from "../layouts/PaddedPage.svelte";

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
    const logged = localStorage.getItem('logged');
</script>

<Nav></Nav>
<PaddedPage>
    <div class="page-container">
        {#if logged == "true"}
            <h2 style="margin-bottom: 32px;">You are now logged in.</h2>
        {/if}
        <div id="homepage-search">
            <Searchbar placeholder={"Browse"}/>
        </div>
        <h1>Highlights</h1>
        <div class="card-container">
            <Card {...cardData.card1} />
            <Card {...cardData.card2} />
            <Card {...cardData.card3} />
        </div>
    </div>
</PaddedPage>

<style>
    .page-container {
        padding-top: 64px;
    }
    h1 {
        font-family: var(--display-type);
        margin: 64px 0px 32px 0px;
    }
    .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
        /* grid-auto-columns: 1fr;
        grid-auto-flow: column; */
        gap: 16px;
    }
    #homepage-search {
        display: block;
        /* position: sticky;
        top: 2px; */
        /* padding: 32px clamp(0px, 20%, 720px); */
    }
</style>
