<script>
    import Button from "../lib/Button.svelte";
    import Tag from "../lib/Tag.svelte";
    import Card from "../lib/Card.svelte";
  </script>

<div class="biopage">
    <div class="main-account">
        <img>
        <h2>Username</h2>
        <h2>Full name</h2>
        <h2>Email</h2>
    </div>
    <div class="post-bar">
        <a href="">User's Posts</a>
        <a href="">Liked Posts</a>
    </div>
    <div class="articles">
        <Card></Card>
        <Card></Card>
    </div>
</div>