<script>
    import Textfield from "../lib/Textfield.svelte";
    import PostEditor from "../lib/PostEditor.svelte";
    import Button from "../lib/Button.svelte";
    import { PaperPlaneTilt } from 'phosphor-svelte';
</script>



<div class="page-container">
    <h1>Create Post</h1>
    <Textfield>Title</Textfield>

    <PostEditor></PostEditor>
    <div id="post-button">  
        <Button type="primary" to="/" icon="iconRight"><PaperPlaneTilt size={"24"} weight="bold"/>Publish</Button>
    </div>
</div>


<style>
    .page-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    #post-button {
      margin-left: auto;
      width: fit-content;
      margin-top: 16px;
    }
</style>



