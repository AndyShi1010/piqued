<script>
    import Button from '../lib/Button.svelte';
    import { House, ArrowRight } from 'phosphor-svelte'
    import Textfield from '../lib/Textfield.svelte';
    import { push } from 'svelte-spa-router'

    import { username } from '../stores.js';

	
    // /** @type {import('./$types').PageData} */
    // export let data;
    export let continueRoute;

    console.log(continueRoute)

    let usernameEmailElem;
    let passwordElem;

    let showUsernameError = false;
    let showPasswordError = false;

    let usernameValid = false;
    let passwordValid = false;

    let usernameError = "Error";
    let passwordError = "Error";

    let loginError = false;

    function validateUsername() {
        usernameEmailElem.value = usernameEmailElem.value.trim();
        const regex = /[^A-Za-z0-9]/;
        let test1 = usernameEmailElem.value.trim() != "";
        let test2 = !usernameEmailElem.value.trim().includes(" ");
        let test3 = !regex.test(usernameEmailElem.value);
        if (test1 && test2 && test3) {
            usernameValid = true;
        } else if (!test1) {
            usernameValid = false;
            usernameError = "Username cannot be blank.";
            showUsernameError = true;
        } else if (!test2) {
            usernameValid = false;
            usernameError = "Username must not contain spaces.";
            showUsernameError = true;
        } else if (!test3) {
            usernameValid = false;
            usernameError = "Username must not contain special characters.";
            showUsernameError = true;
        } else {
            usernameValid = false;
            usernameError = "Username is invalid";
            showUsernameError = true;
        }
    }

    function validatePassword() {
        passwordElem.value = passwordElem.value.trim();
        if (passwordElem.value == "") {
            passwordValid = false;
            passwordError = "Password cannot be empty";
            showUsernameError = true;
        } else {
            passwordValid = true;
            showUsernameError = false;
        }
    }

    function logIn() {
        console.log(usernameEmailElem.value, passwordElem.value);
        fetch(`/login`, 
        {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "usernameEmail": usernameEmailElem.value,
                "password": passwordElem.value
            })
        })
        .then((response) => 
        {   
            if (response.status == 200) {
                response.json()
                .then((json) => {
                    console.log(json);
                    localStorage.setItem("logged", "true");
                    localStorage.setItem("userid", json.userid);
                    fetch(`/login/id`, 
                    {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "userid": json.userid
                        })
                    }).then((response) => {
                        response.json()
                        .then((json) => {
                            console.log(json);
                            username.set(json.username);
                            localStorage.setItem("username", json.username);
                            push(continueRoute);
                        })
                    })
                })
            } else {
                loginError = true;
            }
        })
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
                    <Textfield
                        type="text"
                        bind:elem={usernameEmailElem}
                        on:change={validateUsername}
                        error={!usernameValid && showUsernameError}
                        required>Username</Textfield
                    >
                    {#if !usernameValid && showUsernameError}
                        <div class="validation-error">
                            {usernameError}
                        </div>
                    {/if}
                </div>
                <div class="textfield-container">
                    <Textfield
                        type="password"
                        bind:elem={passwordElem}
                        on:input={validatePassword}
                        error={!passwordValid && showPasswordError}
                        required>Password</Textfield
                    >
                    {#if !passwordValid && showPasswordError}
                        <div class="validation-error">
                            {passwordError}
                        </div>
                    {/if}
                </div>
            </form>
            <p>Don't have an account? <a href="/#/signup">Sign Up!</a></p>
            {#if loginError}
            <div class="validation-error">
                There was an issue logging you in.
            </div>
            {/if}
            <div class="login-button">
                <Button 
                    on:click={logIn} 
                    icon="iconRight"
                    disabled={!(
                        usernameValid &&
                        passwordValid
                    )}
                ><ArrowRight size={"24"} weight="bold"/>Login</Button>
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
        .validation-error {
            margin-block-start: 8px;
            font-family: var(--body-type);
            color: var(--error-red-700);
            font-size: 14px;
        }
    }
</style>