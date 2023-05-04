<script>
    import Nav from "../lib/Navbar.svelte";
    import PaddedPage from "../layouts/PaddedPage.svelte";
    import Textfield from "../lib/Textfield.svelte";
    import PostEditor from "../lib/PostEditor.svelte";
</script>


<Nav />
<PaddedPage>
    <h1>Create Post</h1>
    <Textfield>Title</Textfield>

    <PostEditor></PostEditor>
</PaddedPage>



