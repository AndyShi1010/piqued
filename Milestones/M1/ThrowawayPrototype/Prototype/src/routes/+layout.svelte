<script>
    import Nav from "../lib/Nav.svelte";
    import {page} from '$app/stores';
</script>

{#if !($page.url.pathname == "/")}
<Nav />
{/if}

<slot></slot>