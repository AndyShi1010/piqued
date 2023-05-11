<script>
    import { EnvelopeSimple, Warning, CaretRight } from 'phosphor-svelte'
    import Checkbox from '../lib/Checkbox.svelte';
    import Textfield from '../lib/Textfield.svelte';
    import Button from '../lib/Button.svelte';
    import Menu from '../lib/Menu.svelte';
    import MenuEntry from '../lib/MenuEntry.svelte';
    import MenuDropdown from '../lib/MenuDropdown.svelte';
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
            <Textfield bind:error={checkboxError} bind:disabled={checkboxDisabled}>
                <EnvelopeSimple slot="leading-icon" size="{24}" />
                Test
                <Warning size="{24}" slot="trailing-icon"/>
            </Textfield>
            <Textfield type="password" bind:disabled={checkboxDisabled}>Password</Textfield>
            <Textfield type="email" bind:textValue={emailValue} bind:disabled={checkboxDisabled}>Email</Textfield>
            <p>{emailValue}</p>
            <Textfield type="tel" bind:disabled={checkboxDisabled}>Tel</Textfield>
            <Textfield type="time" bind:disabled={checkboxDisabled}>Time</Textfield>
            <Textfield type="date" bind:disabled={checkboxDisabled}>
                Date
            </Textfield>
            <Textfield type="text" bind:disabled={checkboxDisabled}>
                Disabled
            </Textfield>
            <!-- <Textfield type="color"></Textfield> -->
        </div>
        
        <!-- <div class="column" id="menu">
            <Button on:click="{() => {console.log("Hello World")}}" bind:disabled={showImage}>Show Menu</Button>
        </div> -->

        <Menu width="{240}">
            <Button slot="menu-button">Menu</Button>
            <MenuDropdown slot="dropdown">
                <MenuEntry>
                    <EnvelopeSimple slot="leading-icon" size="{24}" />
                    Orange
                    <CaretRight slot="trailing-icon" size="{16}" />
                </MenuEntry>
                <MenuEntry>
                    <EnvelopeSimple slot="leading-icon" size="{24}" />
                    Banana
                </MenuEntry>
                <MenuEntry>
                    <EnvelopeSimple slot="leading-icon" size="{24}" />
                    Strawberry
                </MenuEntry>
            </MenuDropdown>
        </Menu>

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