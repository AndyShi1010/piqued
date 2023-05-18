<script>
    import Button from '../lib/Button.svelte';
    import { House, ArrowRight } from 'phosphor-svelte'
    import Textfield from '../lib/Textfield.svelte';
    // /** @type {import('./$types').PageData} */
    // export let data;
    export let continueRoute;

    console.log(continueRoute)

    function logIn() {
        localStorage.setItem("logged", "true");
        localStorage.setItem("user", "TempUser");
        localStorage.setItem("newLog", "true");
    }
</script>

<div class="page-container">
    <div class="splash">
        <img src="../img/grapes.jpg" alt="Grapes" loading="lazy">
    </div>
    <div class="prompt">
        <div id="home-button"><Button type="primary" to="/" icon="iconLeft"><House size={"24"}/>Home</Button></div>
        <div class="login-container">
            <h1>Log In</h1>
            <form method="post" action="../server/models/users.js">
                <div class="textfield-container">
                    <Textfield  type="text">Username/Email</Textfield>
                </div>
                <div class="textfield-container">
                    <Textfield  type="password">Password</Textfield>
                </div>
            </form>
            <p>Don't have an account? <a href="/#/signup">Sign Up!</a></p>
            <div class="login-button">
                <Button on:click={logIn} to={continueRoute ? continueRoute : "/"} icon="iconRight"><ArrowRight size={"24"} weight="bold"/>Login</Button>
            </div>
        </div>
        
    </div>
</div>

<style>
    h1 {
        margin-bottom: 32px;
    }
    .page-container {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        display: grid;
        height: 100vh;
    }
    .splash {
        grid-area: 1 / 1;
        height: 100%;
    }
    /* .splash div {
        position: absolute;
        top: 32px;
        left: 32px;
    } */
    .splash img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .prompt {
        grid-area: 1 / 1;
        padding: 32px;
    }

    .prompt .login-container {
        padding: 48px;
        margin-top: 32px;
        background-color: var(--primary-orange-100);
        border-radius: 8px;
        box-shadow: 4px 0px 16px rgba(0,0,0,0.15); 
    }

    .prompt form {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .login-button {
        width: 100%;
        margin-left: auto;
        display: flex;
        justify-content: flex-end;
    }
    .prompt p {
        margin: 0;
        margin-top: 32px;
        margin-bottom: 32px;
    }

    .prompt p a {
        font-weight: 700;
        color: var(--accent-red-700);
    }

    @media screen and (min-width: 720px) {
        .page-container {
            grid-template-columns: 1fr 480px;
        }
        .splash {
            grid-area: 1 / 1;
        }
        .prompt {
            grid-area: 1 / 2;
            /* background-color: var(--primary-orange-100); */
            box-shadow: -4px 0px 16px rgba(0,0,0,0.15);
            padding: 64px; 
        }
        .prompt #home-button {
            position: absolute;
            top: 32px;
            left: 32px;
        }
        .prompt .login-container {
            padding: 0;
            margin-top: 0;
            border-radius: 0px;
            box-shadow: none; 
        }
    }
</style>