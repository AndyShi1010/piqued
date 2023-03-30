<script>
    import Button from "./Button.svelte";
</script>

<div id="nav">
    <div id="logo">

    </div>
    <div id="action-buttons">
        <Button to="/login" secondary>Log In</Button>
        <Button to="/signup">Sign Up</Button>
    </div>
</div>

<style>
    div#nav {
        /* border-bottom: 1px solid black; */
        height: 52px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #FCCFC5;
        position: fixed;
    }
    div#logo {
        width: 120px;
        height: 100%;
        margin-left: 32px;
        border: 1px solid black;
    }
    div#action-buttons {
        display: flex;
        gap: 16px;
        margin-right: 32px;
    }
</style>