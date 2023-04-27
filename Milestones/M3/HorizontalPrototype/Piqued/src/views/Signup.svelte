<script>
    import Button from '../lib/Button.svelte';
    import { House, ArrowRight } from 'phosphor-svelte'
    import Textfield from '../lib/Textfield.svelte';
    // /** @type {import('./$types').PageData} */
    // export let data;

    function signUp() {
        localStorage.setItem("logged", "true");
    }
</script>

<div class="page-container">
    <div class="splash">
        <img src="../img/grapes.jpg" alt="Grapes">
    </div>
    <div class="prompt">
        <div id="home-button"><Button type="primary" to="/" icon="iconLeft"><House size={"24"}/>Home</Button></div>
        <div class="signup-container">
            <h1>Sign Up</h1>
            <form action="">
                <div class="textfield-container">
                    <Textfield type="text">Full Name</Textfield>
                </div>
                <div class="textfield-container">
                    <Textfield type="email">Email</Textfield>
                </div>
                <div class="textfield-container">
                    <Textfield type="text">Username</Textfield>
                </div>
                <div class="textfield-container">
                    <Textfield  type="password">Password</Textfield>
                </div>
                <div class="textfield-container">
                    <Textfield type="password">Confirm Password</Textfield>
                </div>
            </form>
            <p>Already have an account? <a href="/#/login">Log In!</a></p>
            <p>By clicking Sign Up you our agreeing to our <a href="/#/login">Terms of Service</a> and <a href="/#/login">Privacy Policy</a>.</p>
            <div class="signup-button">
                <Button on:click={signUp} to="/" icon="iconRight"><ArrowRight size={"24"} weight="bold"/>Sign Up</Button>
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
        padding: 64px;
    }

    .prompt .signup-container {
        padding: 32px;
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

    .signup-button {
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
        }
        .prompt #home-button {
            position: absolute;
            top: 32px;
            left: 32px;
        }
        .prompt .signup-container {
            padding: 0;
            margin-top: 0;
            border-radius: 0px;
            box-shadow: none; 
        }
    }
</style>