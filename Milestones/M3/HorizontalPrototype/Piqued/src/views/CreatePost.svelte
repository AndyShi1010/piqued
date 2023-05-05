<script>
    import Nav from "../lib/Navbar.svelte";
    import PaddedPage from "../layouts/PaddedPage.svelte";
    import Textfield from "../lib/Textfield.svelte";
    import PostEditor from "../lib/PostEditor.svelte";
</script>


<Nav />
<PaddedPage>
    <div class="page-container">
        <h1>Create Post</h1>
        <Textfield>Title</Textfield>

        <PostEditor></PostEditor>
    </div>
</PaddedPage>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 64px 0px;
    }
</style>



