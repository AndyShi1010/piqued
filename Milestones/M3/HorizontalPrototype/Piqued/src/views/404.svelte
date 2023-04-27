<script>
    import Nav from "../lib/Navbar.svelte";
    import PaddedPage from "../layouts/PaddedPage.svelte";
    import Button from '../lib/Button.svelte';
    import { House } from 'phosphor-svelte'
</script>


<Nav />
<PaddedPage>
    <div class="container">
        <h1>🙁 Oops!</h1>
        <h2>404 Page Not Found</h2>
        <p>Sorry. We can't find the page you are looking for.</p>
        <Button to="/" icon="iconLeft"><House size={"24"} weight="bold"/>Take me home</Button>
    </div>
</PaddedPage>

<style>
    .container {
        padding-top: 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .container h1 {
        font-size: 128px;
        margin-bottom: 64px;
    }
    .container p {
        font-size: 18px;
    }
</style>