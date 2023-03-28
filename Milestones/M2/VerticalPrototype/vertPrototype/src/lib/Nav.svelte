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
        border-bottom: 1px solid black;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 8px 0px;
        background-color: #FCCFC5;
    }
    div#logo {
        width: 120px;
        margin-left: 32px;
        border: 1px solid black;
    }
    div#action-buttons {
        display: flex;
        gap: 8px;
        margin-right: 32px;
    }
</style>