<script>
    import Button from "./Button.svelte";
    import { SignOut, NotePencil, User, GearSix, Chats } from "phosphor-svelte"
    import Menu from './Menu.svelte';
    import MenuEntry from './MenuEntry.svelte';
    import MenuDropdown from './MenuDropdown.svelte';
    import { onMount } from "svelte";
    import Chatbox from "./Chatbox.svelte";
    import { username } from '../stores.js';
    const logged = localStorage.getItem('logged');
    let userName = localStorage.getItem('username');

    // username.subscribe(value => {
	// 	userName = value;
	// });
    
    function logOut() {
        localStorage.setItem("logged", "false");
    }

    let width = window.innerWidth;

    window.onresize = () => {width = window.innerWidth};

    let scroll
    let nav
    let navHeight

    let showChatbox = false;

    onMount(() => {
        navHeight = parseInt(nav.offsetHeight);
        // console.log(scroll, navHeight);
    }) 
    

    function onScroll() {
        console.log(scroll, navHeight);
    }

    function toggleChat() {
        showChatbox = !showChatbox;
        if (showChatbox) {
            document.body.addEventListener('click', toggleChat);
        } else {
            document.body.removeEventListener('click', toggleChat);
        }
    }

    // function openChatWindow() {
    // // Open a new window with custom settings
    // const chatWindow = window.open("/#/Chatbox.svelte", "Chat Window", "width=500,height=400");

    // // Create the content to display in the new window
    // const chatContent = document.createElement("div");
    // chatContent.textContent = "This is the chat window content.";

    // // Append the content to the new window
    // chatWindow.document.body.appendChild(chatContent);

    // document.getElementById("myButton").addEventListener("click", openWindow);

    // // Function to open the window
    // function openWindow() {
    //   // Call a function from your separate JavaScript file to open the window
    //   openChatWindow();
    // }
    // }
    
</script>

<div id="nav" class="{(scroll >= navHeight) ? "full-width" : ""}" bind:this={nav}>
    <div id="nav-container">
        
        <a id="logo" href="/">
            <img src="../img/PiquedLogoG.svg" alt="logo"/>
        </a>
        {#if logged == "true"}
        <div id="action-buttons">
            <div class="chat">
                <div class="button-container" on:click|stopPropagation={toggleChat}>
                    <Button type="text" icon="iconOnly">
                        <Chats size={24} weight="bold" />
                    </Button>
                </div>
                <Chatbox bind:show={showChatbox}/>
            </div>
            <!-- Post Button -->
            <Button to="/#/post" icon="iconLeft">
                <NotePencil size="{24}" weight="bold"/>
                Post
            </Button>
            <div class="user-menu">
                <Menu width="{240}" align="bottomRight">
                    <Button slot="menu-button" type="text" icon="{width > 720 ? "iconRight" : "iconOnly"}">
                        <span id="pfp">
                            <User size="{24}" weight="bold"/>
                        </span>
                        {#if width > 720}
                            {userName}
                        {/if}
                    </Button>
                    <MenuDropdown slot="dropdown">
                        <MenuEntry to="/#/user/{userName}">
                            <User slot="leading-icon" size="{24}" weight="bold"/>
                            <!-- <EnvelopeSimple slot="leading-icon" size="{24}" /> -->
                            {userName}
                        </MenuEntry>
                        <div class="separator"></div>
                        <MenuEntry to="#/account">
                            <GearSix slot="leading-icon" size="{24}" weight="bold" />
                            <!-- <EnvelopeSimple slot="leading-icon" size="{24}" /> -->
                            Account Settings
                        </MenuEntry>
                        <MenuEntry on:click={logOut} to="/#/login">
                            <SignOut slot="leading-icon" size="{24}" weight="bold" />
                            <!-- <EnvelopeSimple slot="leading-icon" size="{24}" /> -->
                            Log Out
                        </MenuEntry>
                    </MenuDropdown>
                </Menu>
                <!-- <Button on:click={logOut} to="/#/login"type="text">
                    {userName}
                    <span id="pfp">
                        <User size="{24}" weight="bold"/>
                    </span>
                </Button> -->
            </div>
        </div>
        {:else}
        <div id="action-buttons">
            <!-- <Button to="/#/test" type="text">
                Test
            </Button> -->
            <Button to="/#/login" type="secondary">
                Log In
            </Button>
            <Button to="/#/signup">
                Sign Up
            </Button>
        </div>
        {/if}
    </div>
    
</div>

<svelte:window bind:scrollY={scroll} />

<style>
    div#nav {
        /* border-bottom: 1px solid black; */
        height: var(--header-height);
        width: 100%;
        position: fixed;
        box-sizing: border-box;
        z-index: 10;
        transition: background-color 0.25s, border-bottom 0.25s;
    }
    div#nav.full-width {
        background-color: var(--primary-orange-700-a70);
        border-bottom: 1px solid var(--neutral-pink-200);
        backdrop-filter: blur(80px) brightness(1.5);
        -webkit-backdrop-filter: blur(80px) brightness(1.5);
    }
    #nav #nav-container {
        padding: 0px 16px;
        margin: 0px auto;
        height: 100%;
        width: var(--page-width);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: var(--primary-orange-200);
        border-bottom: 1px solid var(--neutral-pink-200);

    }
    a#logo {
        width: auto;
        height: 36px;
        /* border: 1px solid black; */
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--display-type);
        color: var(--accent-red-700);
        font-size: 18px;
        text-decoration: none;
        padding: 0px 16px;
    }
    #logo img {
        width: auto;
        height: 100%;
        display: block;
        color: gray;
        user-select: none;
    }
    div#action-buttons {
        display: flex;
        gap: 16px;
        align-items: center;
    }

    #pfp {
        width: 36px;
        height: 36px;
        background-color: var(--gray-400);
        border-radius: 50%;
        /* margin-left: 8px; */
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
    .separator {
      display: block;
      margin-top: 4px;
      margin-bottom: 4px;
      background-color: var(--neutral-pink-200);
      width: 100%;
      height: 1px;
    }
    .chat {
        position: relative;
    }
</style>