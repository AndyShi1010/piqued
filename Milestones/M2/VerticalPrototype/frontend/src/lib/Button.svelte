<script>
    export let to;
    export let secondary = false;
</script>

<a href={to} class={secondary? "btn-secondary" : "btn-primary"}>
    <slot></slot>
</a>

<style>
    a {
        padding: 4px 16px;
        border-radius: 6px;
        font-family: var(--display-type);
        font-size: 16px;
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