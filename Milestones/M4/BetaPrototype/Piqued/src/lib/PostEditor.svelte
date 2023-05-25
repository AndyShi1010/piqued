<script>
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'
    import { Placeholder } from '@tiptap/extension-placeholder'
    import StarterKit from '@tiptap/starter-kit'
    import { TextItalic, TextStrikethrough, TextT, TextB, TextHOne, TextHTwo, Paragraph, TextUnderline, ImageSquare} from 'phosphor-svelte';
    import Button from './Button.svelte';
    import { Underline } from '@tiptap/extension-underline'
    import { Image } from '@tiptap/extension-image'
    import Uploader from './Uploader.svelte';
    import Dialog from './Dialogue.svelte';

    // import { writable } from 'svelte/store';
  
    let imageModal
    let uploader
    let image = ""

    let element
    let editor
    export let data = ""

    // export const editorContent = writable(data);
  
    onMount(() => {
      
      editor = new Editor({
        element: element,
        extensions: [
          StarterKit,
          Placeholder.configure({
            placeholder: 'Write your story...',
          }),
          Underline,
          Image.configure({
            inline: true,
            allowBase64: true,
          }),
        ],
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          editor = editor
        },
      });
      editor.on('update', ({ editor }) => {
        data = editor.getJSON();
		  });
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
      <TextHOne size={20} weight="bold" />
      </button>
      <button
        on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        class:active={editor.isActive('heading', { level: 2 })}
      >
      <TextHTwo size={20} weight="bold"/>
      </button>

      <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
        <Paragraph size={20} weight="bold"/>
      </button>

      <div class="separator"></div>
      

      <!-- <button on:click={() => console.log(editor.getJSON())}>Save</button> -->

      <button
      on:click={() => editor.chain().focus().toggleMark('bold').run()}
      class:active={editor.isActive('bold')} 
      >
      <TextB size={20} weight="bold"/>
      </button>

      <button
        on:click={() => editor.chain().focus().toggleMark('italic').run()}
        class:active={editor.isActive('italic')}
      >
      <TextItalic size={20} weight="bold"/>
      </button>
      <button
        on:click={() => editor.chain().focus().toggleUnderline('underline').run()}
        class:active={editor.isActive('underline')}
      >
      <TextUnderline size={20} weight="bold"/>
      </button>

      <button
        on:click={() => editor.chain().focus().toggleMark('strike').run()}
        class:active={editor.isActive('strike')}
      >
      <TextStrikethrough size={20} weight="bold"/>
      </button>

      <div class="separator"></div>

      <button
      on:click={() => {imageModal.showDialogClick()}}
      >
      <ImageSquare size={20} weight="bold"/>
      </button>

      <button
        on:click={() => {console.log(editor.getJSON())}}
      >
      Save
      </button>
    </div>
    {/if}
    <div class="editor" bind:this={element} />
</div>

<Dialog bind:this={imageModal} on:close={()=>{uploader.clearFile();}}>
  <div id="image-dialog">
      <h2>Insert Image</h2>
      <Uploader bind:file={image} bind:this={uploader}></Uploader>
      <div class="dialog-buttons">
          <Button on:click={() => {imageModal.closeClick()}} type="secondary">Close</Button>
          <Button on:click={() => {
            editor.commands.setImage({ src: image })
            // uploader.clearFile()
            imageModal.closeClick()}}
            disabled={image == ""}
          >Insert</Button>
      </div>
  </div>
</Dialog>


  
  <style>
    button {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 8px;
      margin-top: 0px;
      margin-bottom: 0px;
      background-color: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s, color 0.25s;
    }
    button:hover {
      background-color: var(--primary-orange-800);
    }
    button.active {
      background-color: var(--accent-red-700);
      color: white;
      /* border: 2px solid var(--accent-red-700); */
    }
    button.active:hover {
      background-color: var(--accent-red-800);
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
      /* height: 100%; */
      padding: 24px;
      border: none;
      border-radius: 8px;
      border: 2px solid transparent;
      transition: border 0.25s;
    }
    .separator {
      display: inline-block;
      margin-left: 8px;
      margin-right: 8px;
      background-color: var(--gray-400);
      width: 1px;
      height: 32px;
    }
    .editor h1 {
      line-height: 1.5;
    }
    .editor:focus, .editor:focus-within {
      border: 2px solid var(--accent-red-700);
    }
    .editor :global(.ProseMirror) {
      min-height: 128px;
      height: 100%;
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
    .editor :global(.ProseMirror h1) {
      line-height: 2;
      font-family: var(--body-type);
      font-weight: 800;
    }
    .editor :global(.ProseMirror h2) {
      line-height: 1.5;
      font-family: var(--body-type);
    }
    .editor :global(.ProseMirror img) {
      width: 100%;
    }
    .dialog-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    #image-dialog {
        /* padding: 100px, 100px; */
        height: auto;
        width: 360px;
        border-width: 1px;
        transition: all 2s;
        display: flex;
        flex-direction: column;
        gap: 16px; 
    }
  </style>