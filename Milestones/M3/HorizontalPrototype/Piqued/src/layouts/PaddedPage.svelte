<script>
    import { fade } from 'svelte/transition';
</script>

<div class="padded-page" in:fade="{{duration: 500}}">
    <slot></slot>
</div>


<style>
    .padded-page {
        padding-top: var(--header-height);
        /* background-color: var(--secondary-accent-tint); */
        height: 100%;
        min-height: calc(100vh - var(--header-height));
        width: var(--page-width);
        margin: 0px auto;
    }

    @media screen and (min-width: 1920px) {
        .padded-page {
            width: 1280px;
        }
    }
    @media screen and (max-width: 720px) {
        .padded-page {
            width: 90%;
        }
    }
</style>
