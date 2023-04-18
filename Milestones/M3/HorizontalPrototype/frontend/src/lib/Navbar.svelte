<script>
    import Button from "./Button.svelte";
    import { SignIn } from "phosphor-svelte"
</script>

<div id="nav">
    <a id="logo" href="/">
        Piqued
    </a>
    <div id="action-buttons">
        <Button to="/login" type="secondary">
            Log In
        </Button>
        <Button to="/signup">
            Sign Up
        </Button>
    </div>
</div>

<style>
    div#nav {
        /* border-bottom: 1px solid black; */
        height: var(--header-height);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--primary-orange-700);
        position: fixed;
        border-bottom: 1px solid var(--neutral-pink-200);
        z-index: 10;
    }
    a#logo {
        width: 120px;
        height: 100%;
        margin-left: 32px;
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
        gap: 16px;
        margin-right: 32px;
    }
</style>