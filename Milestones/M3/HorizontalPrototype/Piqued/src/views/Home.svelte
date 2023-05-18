<script>
    import Searchbar from "../lib/Searchbar.svelte";
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
    const logged = localStorage.getItem('logged');

    let showHeading = true;
    setTimeout(() => {
    showHeading = false;
    }, 2500);

    // // Get the h2 tag
    // var h2 = document.querySelector("h2");
    // // Set a flag to keep track of whether the h2 tag has already been shown
    // var hasShownH2 = false;
    // // Define a function to show and hide the h2 tag
    // function showAndHideH2() {
    //   // If the h2 tag has already been shown, return
    //   if (hasShownH2) {
    //     return;
    //   }
    //   // Set the flag to true
    //   hasShownH2 = true;
    //   // Show the h2 tag
    //   h2.style.display = "block";
    //   // Wait for 2.5 seconds
    //   setTimeout(function() {
    //     // Hide the h2 tag
    //     h2.style.display = "none";
    //   }, 2500);
    // }
    // // Call the showAndHideH2 function when the page loads
    // showAndHideH2();
</script>

<div class="page-container">  
    <!-- {#if logged == "true" && showHeading}
        <h2 style="margin-bottom: 32px; text-align: center; color: #0f5023">You are logged in.</h2>
    {/if} -->
    <div id="homepage-search">
        <Searchbar placeholder={"Browse"}/>
    </div>
    <h1>Highlights</h1>
    
    <div class="card-container">
        <Card {...cardData.card1} index={0}/>
        <Card {...cardData.card2} index={1}/>
        <Card {...cardData.card3} index={3}/>
    </div>
</div>

<style>
    /* .page-container {
        padding-top: 64px;
        padding-bottom: 64px;
    } */
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
  
  