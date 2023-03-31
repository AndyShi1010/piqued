<script>
    import Nav from "../lib/Navbar.svelte";
</script>

<Nav></Nav>
<slot></slot>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Secular+One&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
    :root {
        --primary-accent: #7B1333;

        --secondary-accent: #FCCFC5;
        --secondary-accent-tint: #FEEFEC;

        --display-type: 'Secular One', sans-serif;
        --body-type: 'Nunito Sans', sans-serif;
    }
</style>