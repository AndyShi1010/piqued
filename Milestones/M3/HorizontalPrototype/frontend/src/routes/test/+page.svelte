<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import Checkbox from '../../lib/Checkbox.svelte';
    import Textfield from '../../lib/Textfield.svelte';
    let showImage = false;
</script>

<div class="page-container">
    <h1>Test Page</h1>
    <div class="row">
        <div class="column">
            <Checkbox bind:checked={showImage}>This is a test</Checkbox>
            {#if showImage == true}
                <img width="400" src="../img/movie.jpg" alt="Movie">
            {/if}
        </div>
        <div class="column" id="fields">
            <Textfield placeholder="Name"></Textfield>
            <Textfield type="password" placeholder="Password"></Textfield>
            <Textfield type="email" placeholder="Email"></Textfield>
            <Textfield type="date"></Textfield>
        </div>
        
    </div>
    

    
</div>

<style>
    .row {
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
    }

    #fields {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>