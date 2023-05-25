<script>
    import Button from "../lib/Button.svelte";
    import { House, ArrowRight } from "phosphor-svelte";
    import Textfield from "../lib/Textfield.svelte";
    import { CheckCircle, XCircle } from "phosphor-svelte";
    import { push } from 'svelte-spa-router'
    // /** @type {import('./$types').PageData} */
    // export let data;

    let fullnameElem;
    let usernameElem;
    let emailElem;
    let passwordElem;
    let passwordConfirmElem;

    // let emailElemVal = "";
    let showFullnameError = false;
    let showEmailError = false;
    let showUsernameError = false;
    let showPasswordChecks = false;
    let showPasswordError = false;
    let showPasswordMatchError = false;

    let fullnameValid = false;
    let emailValid = false;
    let usernameValid = false;
    let passwordValid = false;

    let passwordEight = false;
    let passwordUppercase = false;
    let passwordLowercase = false;
    let passwordNum = false;
    let passwordSpecial = false;
    let passwordMatch = false;

    let disableSubmit = true;

    let emailError = "Error";
    let usernameError = "Error";
    let fullnameError = "Error";
    let passwordError = "Error";

    function signUp() {
        console.log(fullnameElem.value, usernameElem.value, emailElem.value, passwordElem.value);
        fetch(`/api/signup`, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "fullname": fullnameElem.value,
                "username": usernameElem.value,
                "email": emailElem.value,
                "password": passwordElem.value
            })
        })
        .then((response) => 
        {
            console.log(response)
            push("/")
        })
    }

    function validateName() {
        const regex = /^[^!@#$%^&*()_\-\+\={}\[\]\|\\`~<>?]+$/;
        fullnameElem.value = fullnameElem.value.trim();
        let test1 = fullnameElem.value != "";
        let test2 = regex.test(fullnameElem.value);
        console.log("Full name", test1, test2);
        if (test1 && test2) {
            fullnameValid = true;
        } else if (!test1) {
            fullnameValid = false;
            fullnameError = "Full name must not be blank.";
            showFullnameError = true;
        } else if (!test2) {
            fullnameValid = false;
            fullnameError = "Full name must not contain special characters.";
            showFullnameError = true;
        } else {
            fullnameValid = false;
            fullnameError = "Full Name is invalid.";
            showFullnameError = true;
        }
    }

    function validateEmail() {
        // console.log(emailElem.value);
        emailElem.value = emailElem.value.trim();
        let test1 = emailElem.value != "";
        let test2 = emailElem.checkValidity();
        const regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let test3 = regex.test(emailElem.value);

        if (test1 && test2 && test3) {
            emailValid = true;
        } else if (!test1) {
            emailValid = false;
            emailError = "Email cannot be blank.";
            showEmailError = true;
        } else if (!test2) {
            emailValid = false;
            emailError = emailElem.validationMessage;
            showEmailError = true;
        } else if (!test3) {
            emailValid = false;
            emailError = "Email is not in the correct format.";
            showEmailError = true;
        } else {
            emailValid = false;
            emailError = "Email is invalid";
            showEmailError = true;
        }
    }

    function validateUsername() {
        usernameElem.value = usernameElem.value.trim();
        const regex = /[^A-Za-z0-9]/;
        let test1 = usernameElem.value.trim() != "";
        let test2 = !usernameElem.value.trim().includes(" ");
        let test3 = !regex.test(usernameElem.value);

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
        const containUpper = /[A-Z]+/g;
        const containLower = /[a-z]+/g;
        const containNum = /\d+/g;
        const containSpecial = /[!@#$%^&*()_\-+={}[\]|\\:;"'<,>.?/~`]+/g;
        passwordElem.value = passwordElem.value.trim();

        if (passwordElem.value == "") {
            passwordError = "Password cannot be empty";
        } else {
            passwordError = "Password must meet the following conditions.";
        }

        let test1 = containUpper.test(passwordElem.value);
        let test2 = containNum.test(passwordElem.value);
        let test3 = containSpecial.test(passwordElem.value);
        let test4 = containLower.test(passwordElem.value);
        let test5 = passwordElem.value.length >= 8;

        passwordUppercase = test1 ? true : false;
        passwordNum = test2 ? true : false;
        passwordSpecial = test3 ? true : false;
        passwordLowercase = test4 ? true : false;
        passwordEight = test5 ? true : false;

        console.log(
            "Password",
            "Uppercase " + test1,
            "Number " + test2,
            "Special " + test3,
            "Lowercase " + test4,
            "Eight " + test5
        );

        if (test1 && test2 && test3 && test4 && test5) {
            passwordValid = true;
            showPasswordError = false;
        } else {
            passwordValid = false;
            // showPasswordError = true;
        }

        if (passwordConfirmElem.value != "") {
            checkPasswordMatch();
        }
    }

    function checkPasswordMatch() {
        passwordConfirmElem.value = passwordConfirmElem.value.trim();
        if (passwordConfirmElem.value == passwordElem.value) {
            passwordMatch = true;
            showPasswordMatchError = false;
        } else {
            passwordMatch = false;
            showPasswordMatchError = true;
        }
    }

    function print() {
        console.log(emailElem.value, emailElem.validationMessage);
    }
</script>

<div class="page-container">
    <div class="splash">
        <img src="../img/grapes.jpg" alt="Grapes" loading="lazy" />
    </div>
    <div class="prompt">
        <div id="home-button">
            <Button type="primary" to="/" icon="iconLeft"
                ><House size={"24"} />Home</Button
            >
        </div>
        <div class="signup-container">
            <h1>Sign Up</h1>
            <form method="post" action="../server/routes/signup.js">
                <div class="textfield-container">
                    <Textfield
                        type="text"
                        bind:elem={fullnameElem}
                        on:change={validateName}
                        error={!fullnameValid && showFullnameError}
                        required>Full Name</Textfield
                    >
                    {#if !fullnameValid && showFullnameError}
                        <div class="validation-error">
                            {fullnameError}
                        </div>
                    {/if}
                </div>
                <div class="textfield-container">
                    <Textfield
                        type="email"
                        bind:elem={emailElem}
                        on:change={validateEmail}
                        error={!emailValid && showEmailError}
                        required>Email</Textfield
                    >
                    {#if !emailValid && showEmailError}
                        <div class="validation-error">
                            {emailError}
                        </div>
                    {/if}
                </div>
                <div class="textfield-container">
                    <Textfield
                        type="text"
                        bind:elem={usernameElem}
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
                        on:focus={() => {
                            showPasswordChecks = true;
                        }}
                        required>Password</Textfield
                    >
                    {#if !passwordValid && showPasswordError}
                        <div class="validation-error">
                            {passwordError}
                        </div>
                    {/if}
                    <div
                        class="password-checks {showPasswordChecks
                            ? 'show'
                            : ''}"
                    >
                        <div
                            class="check {passwordEight ? 'pass' : ''}"
                            id="eight-chars"
                        >
                            {#if passwordEight}
                                <CheckCircle size={16} weight="fill" />
                            {:else}
                                <XCircle size={16} weight="fill" />
                            {/if}
                            8 characters or more.
                        </div>
                        <div
                            class="check {passwordUppercase ? 'pass' : ''}"
                            id="uppercase"
                        >
                            {#if passwordUppercase}
                                <CheckCircle size={16} weight="fill" />
                            {:else}
                                <XCircle size={16} weight="fill" />
                            {/if}
                            Contains one or more uppercase letter.
                        </div>
                        <div
                            class="check {passwordLowercase ? 'pass' : ''}"
                            id="lowercase"
                        >
                            {#if passwordLowercase}
                                <CheckCircle size={16} weight="fill" />
                            {:else}
                                <XCircle size={16} weight="fill" />
                            {/if}
                            Contains one or more lower letter.
                        </div>
                        <div
                            class="check {passwordNum ? 'pass' : ''}"
                            id="special"
                        >
                            {#if passwordNum}
                                <CheckCircle size={16} weight="fill" />
                            {:else}
                                <XCircle size={16} weight="fill" />
                            {/if}
                            Contains one or more numbers.
                        </div>
                        <div
                            class="check {passwordSpecial ? 'pass' : ''}"
                            id="special"
                        >
                            {#if passwordSpecial}
                                <CheckCircle size={16} weight="fill" />
                            {:else}
                                <XCircle size={16} weight="fill" />
                            {/if}
                            Contains one or more special characters.
                        </div>
                    </div>
                </div>
                <div class="textfield-container">
                    <Textfield
                        type="password"
                        bind:elem={passwordConfirmElem}
                        on:change={checkPasswordMatch}
                        error={!passwordMatch && showPasswordMatchError}
                        required>Confirm Password</Textfield
                    >
                    {#if !passwordMatch && showPasswordMatchError}
                        <div class="validation-error">
                            Passwords do not match.
                        </div>
                    {/if}
                </div>

                <p>Already have an account? <a href="/#/login">Log In!</a></p>
                <p>
                    By clicking Sign Up you are agreeing to our <a
                        href="/#/terms">Terms of Service</a
                    >
                    and <a href="/#/privacy">Privacy Policy</a>.
                </p>
                <div class="signup-button">
                    <Button
                        on:click={signUp}
                
                        icon="iconRight"
                        disabled={!(
                            fullnameValid &&
                            usernameValid &&
                            emailValid &&
                            passwordValid &&
                            passwordMatch
                        )}
                        ><ArrowRight size={"24"} weight="bold" />Sign Up</Button
                    >
                </div>
            </form>
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
    .splash img {
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
        box-shadow: 4px 0px 16px rgba(0, 0, 0, 0.15);
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
        font-size: 14px;
    }

    .password-checks {
        display: flex;
        flex-direction: column;
        gap: 8px;
        height: 0px;
        opacity: 0;
        /* transform: scaleY(0);
        transform-origin: top; */
        /* overflow: hidden; */
        transition: height 0.25s, opacity 0.25s;
    }

    .password-checks.show {
        margin-top: 8px;
        height: auto;
        opacity: 1;
        /* transform: scaleY(1); */
    }

    .password-checks .check {
        color: var(--gray-400);
        font-family: var(--body-type);
    }

    .password-checks .check.pass {
        color: var(--accent-red-700);
        font-weight: 600;
    }

    .check :global(svg) {
        vertical-align: middle;
        margin: 0px 8px;
        display: inline-block;
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
            box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.15);
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
