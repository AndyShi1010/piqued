<script>
    import Search from "../lib/Searchbar.svelte";
    import Card from "../lib/Card.svelte";

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
</script>


<div class="page-container">
    <div id="homepage-search">
        <Search placeholder={"Browse"}/>
    </div>
    <h1>Highlights</h1>
    <div class="card-container">
        <Card {...cardData.card1} />
        <Card {...cardData.card2} />
        <Card {...cardData.card3} />
    </div>
</div>

<style>
    h1 {
        font-family: var(--display-type);
        margin: 32px 0px;
    }
    .page-container {
        background-color: var(--secondary-accent-tint);
        height: min(100vh, 100%);
        padding: calc(52px + 64px) clamp(64px, 15%, 480px);
    }
    .card-container {
        display: grid;
        /* grid-template-columns: repeat(3, 1fr); */
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
        gap: 16px;
    }
    #homepage-search {
        display: block;
        /* position: sticky;
        top: 2px; */
        /* padding: 32px clamp(0px, 20%, 720px); */
    }
</style>
