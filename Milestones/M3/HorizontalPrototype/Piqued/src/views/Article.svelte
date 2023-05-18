<script>
  import Button from "../lib/Button.svelte";
  import Footer from "../lib/Footer.svelte";
  import Tag from "../lib/Tag.svelte";
</script>

<div class="article-page">
  <!-- Post title -->
  <div class=post-title>
      <h1>Post Title</h1>
      <div class="tags">
          <Tag type="tag">card-tag1</Tag>
          <Tag type="tag">card-tag2</Tag>
      </div>
  </div>
  <!-- Article information -->
  <div class="article-information">
      
  </div>
  <!-- Author Information -->
  <div class="author">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src="../img/burger.jpg" alt="description of image" width="30" height="20"> 
      <h1>Author Name</h1>
      <p>Date Uploaded : </p>
      <p>Date Modified : </p>
      <Button>Like</Button>
  </div>
  <!-- Comments -->
  <div class="comments">
      <h1>Comments</h1>
  </div>
</div>

