<script>
    import { UploadSimple, Trash } from 'phosphor-svelte';

    export let fileInput
    export let file
    let filename

    const onFileSelected =(e)=>{
        let image = e.target.files[0];
        if (image) {
            filename = e.target.files[0].name;
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                file = e.target.result
                // console.log(file)
            };
        }
    }

    export const clearFile = (e) => {
        fileInput.value = null;
        file = "";
    }
</script>

<label class="input-file" for="post-file">
    {#if file}
    <div class="img-container">
        <!-- <div class="images"> -->
        <img class="image" src="{file}" alt="d" />
        <!-- <img class="image-overlay" src="{file}" alt="d" /> -->
        <!-- </div> -->
    </div>
    <div class="uploaded-image">
        <p>{filename}</p>
        <button class="delete" on:click|preventDefault={(e)=>clearFile(e)}>
            <Trash size={24} weight="bold" />
        </button>
    </div>
    {/if}

    <input style="display: none" name="file" class="filebox" type="file" id="post-file" accept="image/*" on:change={(e)=>onFileSelected(e)} bind:this={fileInput} required>
    <div style="{file ? 'display: none' : 'display: flex'}"class="displayed-filebox">
        <div class="filebox-center">
            <UploadSimple size={24} weight="bold" />
            <p>Upload File</p>
        </div>
    </div>
</label>

<style>
    /* .input-file input {
        display: none;
    } */
    .img-container {
        background-color: var(--primary-orange-700);
        width: 100%;
        max-height: 340px;
        position: relative;
        display: flex;
        border-radius: 8px;
        overflow: hidden;
    }

    /* .img-container .images {
        width: min-content;
        box-shadow: 0px 0px 4px 0px rgb(0,0,0);
    } */
    
    .img-container img {
        width: 100%;
        height: auto;
        object-fit: contain;
        display: block;
        /* filter: brightness(0.5); */
    }

    /* .img-container .image-overlay{
        width: 100%;
        height: auto;
        object-fit: contain;
        display: block;
        position: absolute;
    } */

    .input-file .displayed-filebox {
        width: 100%;
        background-color: var(--primary-orange-700);
        border: 2px solid transparent;
        display: block;
        height: 64px;
        width: 360px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: border 0.25s;
        position: relative;
    }
    .filebox-center {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
        padding: 8px 16px;
        border-radius: 8px;
        color: var(--accent-red-700);
        transition: color 0.25s;
        /* position: relative; */
    }
    .filebox-center p {
        font-family: var(--display-type);
    }
    .displayed-filebox:hover {
        border: 2px solid var(--accent-red-700);
    }
    .displayed-filebox:hover .filebox-center {
        /* background-color: var(--accent-red-700); */
        color: var(--accent-red-800);
    }
    .uploaded-image {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
    }
    .uploaded-image .delete {
        border: 0px;
        background-color: transparent;
        height: 36px;
        width: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: color 0.25s;
        cursor: pointer;
    }
    .uploaded-image .delete::before {
        content: '';
        height: 36px;
        width: 36px;
        position: absolute;
        transform: scale(0);
        transition: transform 0.25s, background-color 0.25s;
        border-radius: 50%;
        z-index: -1;
    }
    .uploaded-image .delete:hover {
        color: var(--error-red-700);
    }
    .uploaded-image .delete:hover::before {
        transform: scale(1);
        background-color: var(--primary-orange-800);
    }
</style>