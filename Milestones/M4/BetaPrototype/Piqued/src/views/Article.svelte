<script>
  import { ThumbsUp } from "phosphor-svelte";
import Button from "../lib/Button.svelte";
  import Footer from "../lib/Footer.svelte";
  import Tag from "../lib/Tag.svelte";
</script>

<div class="page-container">
  <div class="article-page">
    <!-- Post title -->
    <div class="post-title">
        <h1>Post Title</h1>
        <div class="tags">
            <Tag type="tag" to="/#/search?by=tag&q=test">card-tag1</Tag>
            <Tag type="tag" to="/#/search?by=tag&q=test">card-tag2</Tag>
        </div>
        <div class="separator"></div>
    </div>
  </div>
  <div class="sidebar">
    <div class="author">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <div class="account-info">
        <div class="account-image">
          <img src="../img/burger.jpg" alt="profile picture" loading="lazy">
        </div>
        <h2>Author Name</h2>
      </div>
      <div class="separator"></div>
      <div class="post-info">
        <span><p>Date Uploaded</p><p>10/10/23 5:30AM</p></span>
        <span><p>Date Modified</p><p>10/10/23 5:30AM</p></span>
      </div>
      <div class="separator"></div>
      <div class="like-bar">
        <Button icon="iconLeft" type="text">
          <ThumbsUp size={24} weight="bold" />
          Like
        </Button>
        <p class="like-count">100</p>
      </div>
    </div>
    <!-- Comments -->
    <div class="comments">
        <h2>Comments</h2>
        <div class="comments-container">

        </div>
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
  .article-page .post-title {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .article-page .tags {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .author {
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
      /* position: sticky;
      top: 128px; */
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
  .separator {
      display: block;
      margin-top: 4px;
      margin-bottom: 4px;
      background-color: var(--neutral-pink-200);
      width: 100%;
      height: 1px;
  }
  .post-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .post-info span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    white-space: nowrap;
    gap: 16px;
  }
  .post-info span > p {
    width: min-content;
  }
  .like-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
  }
  @media screen and (max-width: 720px) {
        .page-container {
            grid-template-columns: 100%;
            grid-template-rows: min-content auto;
        }
        .sidebar {
            flex-direction: column;
            margin-bottom: 32px;
            /* padding: 16px 32px; */
            grid-area: 1 / 1;
            justify-content: space-between;
            position: relative;
            top: initial;
        }
        /* .info {
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
        } */
    }


</style>

