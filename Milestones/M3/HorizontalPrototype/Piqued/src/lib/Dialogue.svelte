<script>
	// import { onMount } from 'svelte'
	// const defaultText = `This is an example of using the build in HTML dialog tag.<br>
	// In this example you can enter some text and delete it using the Delete everything button below.`
	// let someText = defaultText;
	let info = '';
	let timeout;
	
	let dialog; // Reference to the dialog tag
	// onMount(() => {
	// 	dialog = document.getElementById('confirmation-dialog');
	// })
	
	// Show the dialog when clicking "Delete everything"
	export const showDialogClick = () => {
        dialog.showModal();
	};

	export const closeClick = () => {
		dialog.close();
		setInfo('Dialog closed');
	};

	const setInfo = (text) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		info = text;
		if (text !== '') {
			timeout= setTimeout(() => {
				info = ''
			}, 2500)
		}
	}
</script>

<!-- HTML Code -->
<!-- Dialogue box -->
<dialog bind:this={dialog}>
    <slot></slot>
</dialog>

<!-- Styling -->
<style>
	:root {
		padding: 10px;
	}
[contenteditable] {
	margin: 10px 0 0 0;
	background: #eee;
	padding: 20px;
}
	dialog {
		border-radius: 8px;
		border-width: 0px;
		transition: all 2s;
		padding: 32px;
	}  
	dialog::backdrop {
    background-color: rgba(0,0,0,0.5);
    animation: fade-in 1s;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>