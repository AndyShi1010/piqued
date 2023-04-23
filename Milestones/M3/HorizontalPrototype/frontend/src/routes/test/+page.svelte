<script>
    /** @type {import('./$types').PageData} */
    export let data;
    import { EnvelopeSimple, Warning } from 'phosphor-svelte'
    import Checkbox from '../../lib/Checkbox.svelte';
    import Textfield from '../../lib/Textfield.svelte';
    import Button from '../../lib/Button.svelte';
    let showImage = false;
    let checkboxError = false;
    let checkboxDisabled = false;
    let emailValue = "";
</script>

<div class="page-container">
    <h1>Test Page</h1>
    <div class="row">
        <div class="column">
            <Checkbox bind:checked={showImage}>This is a test</Checkbox>
            <!-- {#if showImage == true}
                <img width="400" src="../img/movie.jpg" alt="Movie">
            {/if} -->
        </div>
        <div class="column" id="fields">
            <Checkbox bind:checked={checkboxError} bind:disabled={showImage}>Error</Checkbox>
            <Checkbox bind:checked={checkboxDisabled} bind:disabled={showImage}>Disabled</Checkbox>
            <Textfield placeholder="Name" bind:error={checkboxError} bind:disabled={checkboxDisabled}>
                <EnvelopeSimple style="display: block" slot="leading-icon" size="{24}" />
                Test
                <Warning style="display: block" size="{24}" slot="trailing-icon"/>
            </Textfield>
            <Textfield type="password" placeholder="Password" bind:disabled={checkboxDisabled}>Password</Textfield>
            <Textfield type="email" placeholder="Email" bind:textValue={emailValue} bind:disabled={checkboxDisabled}>Email</Textfield>
            <p>{emailValue}</p>
            <Textfield type="tel" placeholder="Email" bind:disabled={checkboxDisabled}>Tel</Textfield>
            <Textfield type="time" placeholder="Email" bind:disabled={checkboxDisabled}>Time</Textfield>
            <Textfield type="date" bind:disabled={checkboxDisabled}>
                Date
            </Textfield>
            <Textfield type="text" bind:disabled={checkboxDisabled}>
                Disabled
            </Textfield>
            <!-- <Textfield type="color"></Textfield> -->
        </div>
        
        <div class="column" id="menu">
            <Button on:click="{() => {console.log("Hello World")}}" bind:disabled={showImage}>Show Menu</Button>
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