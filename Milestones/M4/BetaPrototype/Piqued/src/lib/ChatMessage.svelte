<script>
    export let user = "";
    export let time = undefined;
</script>

<div class="chat-message">
    <div class="message-info">
        <div class="message-left">
            <!-- <img src="" alt="" class="pfp"> -->
            <span class="username">{user}</span>
        </div>
        <div class="message-right">
            <span class="timestamp">{time.toLocaleTimeString()}</span>
        </div>
    </div>
    <div class="message-body">
        <span class="message-text">
            <slot></slot>
        </span>
    </div>
</div>

<style>
    .chat-message {
        font-family: var(--body-type);
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .message-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .message-info .username {
        font-weight: 600;
    }
    .message-info .timestamp {
        color: var(--gray-400)
    }
</style>