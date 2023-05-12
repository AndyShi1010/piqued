<script>
    import Button from '../lib/Button.svelte';
    import { House, ArrowRight } from 'phosphor-svelte'
    import Textfield from '../lib/Textfield.svelte';
    // /** @type {import('./$types').PageData} */
    // export let data;

    let fullnameElem;
    let usernameElem;
    let emailElem;
    let passwordElem;
    let passwordConfirmElem;

    // let emailElemVal = "";
    let showEmailError = false;

    let emailValid = false;
    let usernameValid = false;
    let passwordValid = false;
    let passwordMatch = false;

    let disableSubmit = true;

    let emailError = "Email is invalid";

    function signUp() {
        localStorage.setItem("logged", "true");
        localStorage.setItem("user", "SignedUpUser");
    }

    function validateEmail() {
        // console.log(emailElem.value);
        let test1 = emailElem.value && emailElem.value.trim() != "";
        let test2 = emailElem.checkValidity();
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let test3 = regex.test(emailElem.value.trim());

        if (test1 && test2 && test3) {
            emailValid = true;
        } 
        else if (!test1) {
            emailValid = false;
            emailError = "Email cannot be blank.";
            showEmailError = true;
        } 
        else if (!test2) {
            emailValid = false;
            emailError = emailElem.validationMessage;
            showEmailError = true;
        } 
        else if (!test3) {
            emailValid = false;
            emailError = "Email is not in the correct format.";
            showEmailError = true;
        } 
        else {
            emailValid = false;
            emailError = "Email is invalid";
            showEmailError = true;
        }
    }

    function validateUsername() {
        
    }

    function print() {
        console.log(emailElem.value, emailElem.validationMessage);
    }
</script>

<div class="page-container">
    <div class="splash">
        <img src="../img/grapes.jpg" alt="Grapes" loading="lazy">
    </div>
    <div class="prompt">
        <div id="home-button"><Button type="primary" to="/" icon="iconLeft"><House size={"24"}/>Home</Button></div>
        <div class="signup-container">
            <h1>Sign Up</h1>
            <form action="">
                <div class="textfield-container">
                    <Textfield type="text" bind:elem={fullnameElem} required>Full Name</Textfield>
                </div>
                <div class="textfield-container">
                    <Textfield type="email" bind:elem={emailElem} on:change={validateEmail} error={!emailValid && showEmailError} required>Email</Textfield>
                    {#if (!emailValid) && (showEmailError)}
                        <div class="validation-error">
                            {emailError}
                        </div>
                    {/if}

                </div>
                <div class="textfield-container">
                    <Textfield type="text" bind:elem={usernameElem} required>Username</Textfield>
                </div>
                <div class="textfield-container">
                    <Textfield  type="password" bind:elem={passwordElem} required>Password</Textfield>
                </div>
                <div class="textfield-container">
                    <Textfield type="password" bind:elem={passwordConfirmElem} required>Confirm Password</Textfield>
                </div>
            </form>
            <p>Already have an account? <a href="/#/login">Log In!</a></p>
            <p>By clicking Sign Up you are agreeing to our <a href="/#/terms">Terms of Service</a> and <a href="/#/privacy">Privacy Policy</a>.</p>
            <div class="signup-button">
                <Button on:click={signUp} to="/" icon="iconRight" disabled={disableSubmit}><ArrowRight size={"24"} weight="bold"/>Sign Up</Button>
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

    .validation-error {
        margin-block-start: 8px;
        font-family: var(--body-type);
        color: var(--error-red-700);
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
        .prompt .signup-container {
            padding: 0;
            margin-top: 0;
            border-radius: 0px;
            box-shadow: none; 
        }
    }
</style>

