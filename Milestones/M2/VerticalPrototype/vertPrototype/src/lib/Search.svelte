<script>
    import { MagnifyingGlass } from "phosphor-svelte"
</script>

<div id="search">
    <input type="text" placeholder="Search">
    <button type="button">
        <MagnifyingGlass size="{24}"/>
    </button>
</div>

<style>
    #search input{
        color: black;
        background-color: var(--secondary-accent);
        border-radius: 6px 0px 0px 6px;
        border: none;
        font-size: 16px;
        width: 100%;
        /* display: block; */
        height: 48px;
        padding: 0px 16px;
    }
    #search input::placeholder {
        color: black;
    }
    #search button{
        background-color: var(--primary-accent);
        color: white;
        border: none;
        border-radius: 0px 6px 6px 0px;
        display: block;
        height: 48px;
        width: 48px;
    }
    #search{
        display: flex;
    }
</style>