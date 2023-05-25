<script>
    import Textfield from "../lib/Textfield.svelte";
    import PostEditor from "../lib/PostEditor.svelte";
    import Button from "../lib/Button.svelte";
    import { PaperPlaneTilt, PlusCircle } from 'phosphor-svelte';
    import Tag from "../lib/Tag.svelte";
    import { username } from '../stores.js';
    let userName = localStorage.getItem('username');
    // username.subscribe(value => {
    //         userName = value;
    //     });
    // import { editorContent } from "../lib/PostEditor.svelte"

    let tags = []
    let showTagInput = false
    let tagInput

    let postContent;

	// count.subscribe(value => {
	// 	postContent = $editorContent;
    //     console.log(postContent);
	// });


    function pushTag(e) {
        if (e.key === "Enter") {
            e.target.value = e.target.value.trim();
            if (e.target.value != "") {
                if (!tags.includes(e.target.value)) {
                    tags = [...tags, e.target.value]
                    e.target.value = ""
                    showTagInput = false;
                }
            }
        }   
    }
</script>


<div class="page-container">
    <div class="post-container">
        <h1>Create Post</h1>
        <Textfield>Title</Textfield>
        <div class="tag-editor">
            <span>Tags:</span>
            {#each tags as i}
                <button class="tag" on:click={() => {
                        // const item = tags.indexOf(i);
                        tags = tags.filter(t => t != i)
                        // tags = tags.splice(tags.indexOf(i), 1)
                        // console.log(item)
                        console.log(tags);
                    }}>#{i}</button>
            {/each}
            <button class="add-tag" on:click={(e) => {showTagInput = !showTagInput; e.target.blur()}}><PlusCircle size={16} weight="bold" /></button>
            {#if showTagInput}
                <input type="text" id="tag-input" on:keypress={pushTag} bind:this={tagInput} on:blur={() => {showTagInput = false}} autofocus>
            {/if}
        </div>

        <PostEditor bind:data={postContent}></PostEditor>
    </div>

    <div class="main-account">
        <div class="account-info">
            <div class="account-image">
                <img src="../img/burger.jpg" alt="profile picture" loading="lazy">
            </div>
            <h2>{userName}</h2>
        </div>
        <div class="separator"></div>
        <div id="post-button">  
            <Button type="primary" on:click={() => {console.log(postContent)}} icon="iconRight"><PaperPlaneTilt size={"24"} weight="bold"/>Publish</Button>
        </div>
    </div>
</div>


<style>
    .page-container {
        display: grid;
        grid-template-columns: auto min-content;
        column-gap: 64px;
        margin-bottom: 64px;
    }
    .post-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    /* #post-button {
      margin-left: auto;
      width: fit-content;
      margin-top: 16px;
    } */
    .main-account {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        background-color: var(--primary-orange-700);
        padding: 32px;
        box-sizing: border-box;
        border-radius: 8px;
        height: min-content;
        position: sticky;
        top: 128px;
    }
    .account-info {
        padding: 0px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
    .account-image img {
        aspect-ratio: 1 / 1;
        width: 160px;
        height: 160px;
        object-fit: cover;
        border-radius: 50%;
    }
    .info {
        display: flex;
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }
    .separator {
      display: block;
      margin-top: 4px;
      margin-bottom: 4px;
      background-color: var(--neutral-pink-200);
      width: 100%;
      height: 1px;
    }
    .tag-editor {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
        font-family: var(--body-type);
    }
    .tag {
        padding: 6px 8px;
        font-size: 12px;
        border-radius: 4px;
        font-family: var(--body-type);
        text-decoration: none;
        line-height: 1;
        border: 0px;
        background-color: var(--primary-orange-800);
        color: var(--accent-red-900);
        transition: background-color 0.25s;
        height: min-content;
        cursor: pointer;
    }
    .tag:hover, .tag:focus {
        background-color: var(--error-red-100);
        color: var(--error-red-700);
        text-decoration: line-through;
    }
    .add-tag {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        margin-top: 0px;
        margin-bottom: 0px;
        background-color: var(--primary-orange-800);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.25s, color 0.25s;
    }
    .add-tag:hover {
      background-color: var(--primary-orange-900);
    }
    #tag-input {
        background-color: var(--primary-orange-700);
        padding: 4px;
        border-radius: 8px;
        width: 96px;
        font-family: var(--body-type);
    }
    #tag-input:focus {
        padding: 4px;
        background-color: var(--primary-orange-700);
        border: 2px solid var(--accent-red-700);
        outline-offset: 2px;
    }
    @media screen and (max-width: 720px) {
        .page-container {
            grid-template-columns: 100%;
            grid-template-rows: min-content auto;
        }
        .main-account {
            flex-direction: row;
            margin-bottom: 32px;
            padding: 16px 32px;
            grid-area: 1 / 1;
            justify-content: space-between;
            position: relative;
            top: initial;
        }
        .info {
            display: flex;
            flex-direction: column;
            gap: 16px;
            text-align: initial;
        }
        .account-info {
            flex-direction: row;
            gap: 16px;
            padding: 0;
        }
        .account-image img { 
            width: 48px;
            height: 48px;
        }
        .account-info h2 {
            font-size: 16px;
        }
        .separator {
            display: none;
        }
    }
</style>



