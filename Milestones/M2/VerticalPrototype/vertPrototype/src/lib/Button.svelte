<script>
    export let to;
    export let secondary = false;
</script>

<a href={to} class={secondary? "btn-secondary" : "btn-primary"}>
    <slot></slot>
</a>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Secular+One&display=swap');
    a {
        padding: 8px 16px;
        border-radius: 6px;
        font-family: 'Secular One', sans-serif;
        text-decoration: none;
        transition: background-color 0.5s, border 0.5s, color 0.5s;
    }
    .btn-primary {
        background-color: var(--primary-accent);
        color: white;
        border: 2px solid var(--primary-accent);
    }
    .btn-primary:hover {
        color: var(--primary-accent);
        background-color: var(--secondary-accent);
    }
    .btn-secondary {
        background-color: transparent;
        color: var(--primary-accent);
        border: 2px solid var(--primary-accent);
    }
    .btn-secondary:hover {
        color: white;
        background-color: var(--primary-accent);
    }
</style>