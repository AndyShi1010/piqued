<script>
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'
    import { Placeholder } from '@tiptap/extension-placeholder'
    import StarterKit from '@tiptap/starter-kit'
    import { TextItalic, TextStrikethrough, TextT, TextHOne, TextHTwo} from 'phosphor-svelte';
    import Button from './Button.svelte';
  
  
    let element
    let editor
    export let data = ""
  
    onMount(() => {
      
      editor = new Editor({
        element: element,
        extensions: [
          StarterKit,
          Placeholder.configure({
            placeholder: 'Write your story...',
          })
        ],
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
  
  <div class="editor-container">
  {#if editor}
      <div class="toolbar">

      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
        class:active={editor.isActive('heading', { level: 1 })}
      >
      <TextHOne size={24} weight="bold" />
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        class:active={editor.isActive('heading', { level: 2 })}
      >
      <TextHTwo size={24} weight="bold"/>
      </button>

      <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
        <TextT size={24} weight="bold"/>
      </button>

      <div class="separator"></div>
      

      <!-- <button on:click={() => console.log(editor.getJSON())}>Save</button> -->

      <button
      on:click={() => editor.chain().focus().toggleMark('bold').run()}
      class:active={editor.isActive('bold')}
      >
      <TextBolder size={24} weight="bold"/>
      </button>

      <button
        on:click={() => editor.chain().focus().toggleMark('italic').run()}
        class:active={editor.isActive('italic')}
      >
      <TextItalic size={24} weight="bold"/>
      </button>

      <button
        on:click={() => editor.chain().focus().toggleMark('strike').run()}
        class:active={editor.isActive('strike')}
      >
      <TextStrikethrough size={24} weight="bold"/>
      </button>
      <button
        on:click={() => {console.log(editor.getJSON())}}
        class:active={editor.isActive('strike')}
      >
      Save
      </button>
    </div>
    {/if}
    <div class="editor" bind:this={element} />
</div>


  
  <style>
    button {
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 8px;
      margin-top: 0px;
      margin-bottom: 0px;
    }
    button.active {
      /* background: var(--accent-red-700);
      color: white; */
      border: 2px solid var(--accent-red-700);
    }
    .toolbar {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
      margin-bottom: 16px;
    }
    .editor {
      background-color: var(--primary-orange-700);
      height: 100%;
      padding: 24px;
      border: none;
      border-radius: 16px;
    }
    .separator {
      display: inline-block;
      margin-left: 16px;
      margin-right: 16px;
      background-color: var(--gray-400);
      width: 1px;
      height: 32px;
    }
    .editor h1 {
      line-height: 1.5;
    }
    .editor :global(.ProseMirror) {
      min-height: 128px;
      /* resize: vertical; */
      /* overflow: auto; */
    }
    .editor :global(.ProseMirror:focus) {
      outline: none;
    }
    .editor :global(.ProseMirror p.is-editor-empty:first-child::before) {
      color: var(--gray-600);
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  </style>