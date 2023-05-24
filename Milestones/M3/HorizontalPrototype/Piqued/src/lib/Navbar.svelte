<script>
    import Button from "./Button.svelte";
    import { SignOut, NotePencil, User, GearSix, Chats } from "phosphor-svelte"
    import Menu from '../lib/Menu.svelte';
    import MenuEntry from '../lib/MenuEntry.svelte';
    import MenuDropdown from '../lib/MenuDropdown.svelte';
    import { onMount } from "svelte";
    const logged = localStorage.getItem('logged');
    const userName = localStorage.getItem('user');

    function logOut() {
        localStorage.setItem("logged", "false");
    }
    

    let scroll
    let nav
    let navHeight

    onMount(() => {
        navHeight = parseInt(nav.offsetHeight);
        // console.log(scroll, navHeight);
    }) 
    

    function onScroll() {
        console.log(scroll, navHeight);
    }

    
    
</script>

<div id="nav" class="{(scroll >= navHeight) ? "full-width" : ""}" bind:this={nav}>
    <div id="nav-container">
        
        <a id="logo" href="/">
            <img src="../img/PiquedLogoG.svg" alt="logo"/>
        </a>
        {#if logged == "true"}
        <div id="action-buttons">
            <Button type="text">
                <Chats size={24} weight="bold" />
            </Button>
            <Button to="/#/post" icon="iconLeft">
                <NotePencil size="{24}" weight="bold"/>
                Post
            </Button>
            <div class="user-menu">
                <Menu width="{240}" align="bottomRight">
                    <Button slot="menu-button" type="text">
                        {userName}
                        <span id="pfp">
                            <User size="{24}" weight="bold"/>
                        </span>
                    </Button>
                    <MenuDropdown slot="dropdown">
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
        background-color: var(--primary-orange-700);
        border-bottom: 1px solid var(--neutral-pink-200);
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
        gap: 12px;
        align-items: center;
    }

    #pfp {
        width: 36px;
        height: 36px;
        background-color: var(--gray-400);
        border-radius: 50%;
        margin-left: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
</style>