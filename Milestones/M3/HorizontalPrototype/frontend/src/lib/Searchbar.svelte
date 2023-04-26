<script>
    import { MagnifyingGlass } from "phosphor-svelte"

    export let placeholder = "Search"
</script>

<div id="search">
    <input type="text" placeholder={placeholder}>
    <button type="button">
        <MagnifyingGlass size="{24}" weight="bold"/>
    </button>
</div>

<style>
    #search input{
        color: black;
        background-color: var(--secondary-accent);
        /* border-radius: 6px 0px 0px 6px; */
        border: 2px solid var(--secondary-accent);
        font-size: 16px;
        width: 100%;
        /* display: block; */
        height: 48px;
        padding: 0px 16px;
        outline: none;
        border-radius: 6px 0px 0px 6px;
        transition: border 0.2s;
        font-family: var(--body-type);
    }
    #search input::placeholder {
        color: var(--primary-accent);
    }
    #search input:focus {
        border: 2px solid var(--primary-accent);
    }
    #search button{
        background-color: var(--primary-accent);
        color: white;
        border: none;
        /* border-radius: 0px 6px 6px 0px; */
        display: block;
        height: 52px;
        width: 52px;
        padding: 14px;
    }
    #search button:hover {

    }
    #search{
        display: flex;
        transition: box-shadow 0.5s, transform 0.5s;
        border-radius: 6px;
        overflow: hidden;
    }
    #search:focus-within {
        box-shadow: 0px 6px 12px 0px rgba(0,0,0,0.2);
        transform: translateY(-2px)
    }
</style>