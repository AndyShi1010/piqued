<script>
    import Button from "./Button.svelte";
    import { SignIn } from "phosphor-svelte"
</script>

<div id="nav">
    <div id="nav-container">
        <a id="logo" href="/">
            Piqued
        </a>
        <div id="action-buttons">
            <Button to="/#/test" type="text">
                Test
            </Button>
            <Button to="/#/login" type="secondary">
                Log In
            </Button>
            <Button to="/#/signup">
                Sign Up
            </Button>
        </div>
    </div>
    
</div>

<style>
    div#nav {
        /* border-bottom: 1px solid black; */
        height: var(--header-height);
        width: 100%;
        background-color: var(--primary-orange-700);
        position: fixed;
        border-bottom: 1px solid var(--neutral-pink-200);
        box-sizing: border-box;
        z-index: 10;
    }
    #nav #nav-container {
        margin: 0px auto;
        height: 100%;
        width: var(--page-width);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

    }
    a#logo {
        width: 120px;
        height: 100%;
        /* border: 1px solid black; */
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--display-type);
        color: var(--primary-accent);
        font-size: 18px;
        text-decoration: none;
    }
    div#action-buttons {
        display: flex;
        gap: 12px;
    }
</style>