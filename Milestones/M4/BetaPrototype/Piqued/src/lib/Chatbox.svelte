<script>
    import { fly } from 'svelte/transition';
    import ChatMessage from './ChatMessage.svelte';
    import { PaperPlaneRight } from 'phosphor-svelte';
    export let show;

    let messages = [
        {
            user: "Test 1",
            time: new Date(),
            content: "Hello. How are you?"
        },
        {
            user: "Test 2",
            time: new Date(),
            content: "Wassup my homie"
        },
        {
            user: "Test 3",
            time: new Date(),
            content: "Yo"
        }
    ]
</script>

{#if show}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="chatbox-container" transition:fly="{{y: -10, duration: 250}}" on:click|stopPropagation={()=>{}}>
    <h2>Chat</h2>
    <div class="messages-box">
        {#each messages as m}
            <ChatMessage user={m.user} time={m.time}>{m.content}</ChatMessage>
        {/each}
    </div>
    <div class="message-input">
        <input type="text" name="message" id="message-input" placeholder="Type a message...">
        <button class="send">
            <PaperPlaneRight size={24} weight="bold" />
        </button>
    </div>
</div>
{/if}

<style>
    .chatbox-container {
        padding: 16px;
        background-color: var(--primary-orange-100);
        position: absolute;
        top: 100%;
        right: 0;
        box-shadow: 0px 4px 16px rgba(0,0,0,0.15);
        z-index: 10;
        width: 360px;
        height: 420px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-radius: 8px;
    }
    .messages-box {
        height: 100%;
        display: flex;
        flex-direction: column-reverse;
        gap: 16px;
        overflow-y: scroll;
    }
    .message-input {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .message-input input{
        width: 100%;
        height: 48px;
        padding: 0px 16px;
        box-sizing: border-box;
        border-radius: 8px 0px 0px 8px;
        border: 2px solid transparent;
        font-family: var(--body-type);
        background-color: var(--primary-orange-700);
        font-size: 16px;
        transition: border 0.25s, background-color 0.25s;
    }
    .message-input button {
        height: 48px;
        width: 48px;
        padding: 12px;
        /* display: flex;
        justify-content: center;
        align-items: center; */
        border-radius: 0px 8px 8px 0px;
        border: 0px;
        background-color: var(--accent-red-700);
        color: white;
        display: block;
        transition: background-color 0.25s, color 0.25s;
    }
    .message-input button:hover {
        color: var(--primary-orange-700);
        background-color: var(--accent-red-800);
    }
    .message-input button:disabled {
        color: var(--neutral-pink-400);
        background-color: var(--neutral-pink-200);
        pointer-events: none;
        cursor: not-allowed;
    }
</style>