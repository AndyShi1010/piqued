<script>
    import Nav from "../lib/Navbar.svelte";
</script>

<div class="page-top">
    <slot></slot>
</div>

<style>
    /* @import url('https://fonts.googleapis.com/css2?family=Secular+One&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'); */
    :root {
        --accent-red-100: #F8D3DD;
        --accent-red-700: #BE1E4E;
        --accent-red-800: #92173C;
        --accent-red-900: #65102A;

        --primary-orange-100: #FEF7F5;
        --primary-orange-700: #FDE3DD;
        --primary-orange-800: #FABBAD;
        --primary-orange-900: #F9927B;

        --neutral-pink-200: #DDBBC0;
        --neutral-pink-300: #CC99A3;
        --neutral-pink-400: #BB7783;

        --pure-white: #ffffff;

        --gray-200: #CCCCCC;
        --gray-400: #999999;
        --gray-600: #666666;
        --black: #262626;

        --display-type: 'Secular One', sans-serif;
        --body-type: 'Nunito Sans', sans-serif;

        --header-height: 64px;
        --page-width: 75%;
        /* --global-page-width: clamp(1080px, , 90%); */
    }

    div{
        background-color: var(--primary-orange-100);
    }

    .page-top :global(.page-container) {
        padding-top: var(--header-height);
        background-color: var(--secondary-accent-tint);
        height: 100%;
        min-height: calc(100vh - var(--header-height));
        width: var(--page-width);
        margin: 0px auto;
    }

    @media screen and (min-width: 1920px) {
        :root {
            --page-width: 1280px;
        }
        .page-top :global(.page-container) {
            width: 1280px;
        }
    }
    @media screen and (max-width: 720px) {
        :root {
            --page-width: 90%;
        }
        .page-top :global(.page-container) {
            width: 90%;
        }
    }
</style>