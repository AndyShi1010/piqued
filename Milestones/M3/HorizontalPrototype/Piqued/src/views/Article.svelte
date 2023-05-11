<script>
    import Nav from "../lib/Navbar.svelte";
    import PaddedPage from "../layouts/PaddedPage.svelte";
    import Footer from "../lib/Footer.svelte";
    import Navbar from "../lib/Navbar.svelte";
    import Tag from "./Tag.svelte";
</script>

<Navbar/>
<PaddedPage>
    <div class="Article-page">
        <div class=post-title>
            <h1>Post Title</h1>
            <div class="tags">
                <Tag>card-tag1</Tag>
                <Tag>card-tag2</Tag>
            </div>
        </div>
    </div>
    <Footer/>
</PaddedPage>