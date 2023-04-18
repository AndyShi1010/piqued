<script>
    import Nav from "../lib/Navbar.svelte";
</script>

<Nav></Nav>
<div>
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
        --global-page-margin:
    }

    div{
        padding-top: var(--header-height);
        background-color: var(--primary-orange-100);
    }
</style>