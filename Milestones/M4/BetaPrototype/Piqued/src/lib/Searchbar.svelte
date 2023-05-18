<script>
    import { MagnifyingGlass } from "phosphor-svelte"
    import {push, replace} from 'svelte-spa-router'

    export let placeholder = "Search"

    export let value = "";

    // export let onsubmit = null;

    function searchSubmit(e) {
        console.log('Search Submit')
        const keyword = new FormData(e.target).get("search");
        console.log(keyword);
        console.log("Push");
        if (keyword.toString().charAt(0) == "#") {
            push(`/search?by=tag&q=${keyword.toString().substring(1)}`);
        } else {
            push(`/search?by=keyword&q=${keyword}`);
        }
        //window.location.href = `/#/search?by=keyword&q=${keyword}`;
        // if (onsubmit) {
        //     console.log("Page Action")
        //     onsubmit();
        // }
        // window.location.reload();
        // let res = fetch(`/api/search?by=keyword&q=${keyword}`);
        // console.log(res);
    }
</script>

<div id="search">
    <form on:submit|preventDefault={searchSubmit}>
    <!-- <form action=""></form> -->
        <input name="search" type="text" placeholder={placeholder} bind:value={value}>
        <button type="submit">
            <MagnifyingGlass size="{24}" weight="bold"/>
        </button>
    </form>
</div>

<style>
    form {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    #search input{
        color: black;
        background-color: var(--primary-orange-700);
        /* border-radius: 6px 0px 0px 6px; */
        border: 2px solid var(--primary-orange-700);
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
        color: var(--gray-600);
    }
    #search input:focus {
        border: 2px solid var(--accent-red-700);
    }
    #search button{
        background-color: var(--primary-orange-800);
        color: var(--accent-red-900);
        border: none;
        /* border-radius: 0px 6px 6px 0px; */
        display: block;
        height: 52px;
        width: 52px;
        padding: 14px;
        transition: background-color 0.25s, color 0.25s;
    }
    #search input:focus ~ button {
        background-color: var(--accent-red-700);
        color: white;
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
        /* transform: translateY(-2px) */
    }
</style>