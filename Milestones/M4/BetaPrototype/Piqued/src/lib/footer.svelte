<div class="footer-container">
    <div class="logo-container">
        <a id="logo" href="/">
            <img src="../img/PiquedLogoG.svg" alt="logo"/>
        </a>
    </div>
    <div class="links-container">
       <a href="/#/terms">
            Terms of Service 
        </a>
        <p>•</p>
        <a href="#/privacy">
            Privacy Policy
        </a>
        <p>•</p>
        <a href="#/account">
            Account
        </a>
    </div>
    <div class="copyright">
        <p>© 2023 Piqued Inc.</p>
    </div>
</div>

<style>
    .footer-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding-top: 16px;
        padding-bottom: 16px;
        background-color: var(--primary-orange-700);
        border-top: 1px solid var(--neutral-pink-200);
        box-sizing: border-box;
    }
    .links-container {
        display: flex;
        gap: 16px;
    }
    .links-container a{
        color: var(--black);
        text-decoration: none;
        font-family: var(--body-type);
    }
    .links-container a:hover {
        color: var(--accent-red-700);
        text-decoration: underline;
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
        width: 100%;
        height: 100%;
        display: block;
        color: gray;
        user-select: none;
    }
</style>

