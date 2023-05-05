<script>
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'
    import StarterKit from '@tiptap/starter-kit'
    import { TextItalic, TextStrikethrough, TextBolder, TextT, TextHOne, TextHTwo, PaperPlaneTilt} from 'phosphor-svelte';
    import Button from './Button.svelte';
  
  
    let element
    let editor
  
    onMount(() => {
      editor = new Editor({
        element: element,
        extensions: [
          StarterKit,
        ],
        content: '<p>Write your story.. </p>',
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          editor = editor
        },
      })
    })
  
    onDestroy(() => {
      if (editor) {
        editor.destroy()
      }
    })
  </script>
  
  {#if editor}
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
      class:active={editor.isActive('heading', { level: 1 })}
    >
    <TextHOne size={32} />
    </button>
    <button
      on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      class:active={editor.isActive('heading', { level: 2 })}
    >
    <TextHTwo size={32} />
    </button>

    <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
      <TextT size={32} />
    </button>
    

    <!-- <button on:click={() => console.log(editor.getJSON())}>Save</button> -->

    <button
    on:click={() => editor.chain().focus().toggleMark('bold').run()}
    class:active={editor.isActive('bold')}
    >
    <TextBolder size={32} />
    </button>

    <button
      on:click={() => editor.chain().focus().toggleMark('italic').run()}
      class:active={editor.isActive('italic')}
    >
    <TextItalic size={32} />
    </button>

    <button
      on:click={() => editor.chain().focus().toggleMark('strike').run()}
      class:active={editor.isActive('strike')}
    >
    <TextStrikethrough size={32} weight="bold"/>
    </button>

  {/if}
  
  <div class="editor" bind:this={element} />

  <div id="post-button">  <Button type="primary" to="/" icon="iconRight"><PaperPlaneTilt size={"24"} weight="bold"/>Publish</Button>
  </div>

  
  <style>
    button {
      padding: 8px;
      border: none;
      border-radius: 8px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    button.active {
      background: var(--accent-red-700);
      color: white;
    }
    .editor {
      background-color: var(--primary-orange-700);
      min-height: 512px;
      height: auto;
      padding: 16px;
      border: none;
      border-radius: 16px;
    }
    #post-button {
      margin-left: auto;
      width: fit-content;
      margin-top: 16px;
    }
  </style>