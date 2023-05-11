<script>
    import Button from "../lib/Button.svelte";
    import Dialog from "../lib/Dialogue.svelte";
    import Textfield from "../lib/Textfield.svelte";

	let fullNameModal;
	let usernameModal;
	let emailModal;
	let passwordModal;
    
    // const editUsername = () => {
    //     console.log("Edit username");
	// 	usernameModal.showDialogClick();
	// };
    // const editFullName = () => {
    //     console.log("Edit full name");
	// 	fullNameModal.showDialogClick();
	// };
    // const editEmail = () => {
    //     console.log("Edit email");
	// 	emailModal.showDialogClick();
	// };
    // const editPassword = () => {
    //     console.log("Edit password");
	// 	passwordModal.showDialogClick();
	// };

</script>


<div class="account-settings">
    <h1>Account Settings</h1>
    <div class="account-container">
        <div class="account-image">
            <img src="../img/burger.jpg" alt="description of image" width="300" height="200">
        </div>
        <div class="Account-Box">
            <div id="username">
                <h2>Username</h2>
                <div class="account-info-box">
                    <p>Username Lorem Ipsum</p>
                    <Button on:click={() => {usernameModal.showDialogClick()}}>Edit</Button>
                </div>
            </div>
            <div id="Full-Name">
                <h2>Full Name</h2>
                <div class="account-info-box">
                    <p>Full Name Lorem Ipsum</p>
                    <Button on:click={() => {fullNameModal.showDialogClick()}}>Edit</Button>
                </div>
            </div>
            <div id="Email">
                <h2>Email</h2>
                <div class="account-info-box">
                    <p>Email Lorem Ipsum</p>
                    <Button on:click={() => {emailModal.showDialogClick()}}>Edit</Button>
                </div>
            </div>
            <div id="Password">
                <h2>Password</h2>
                <div class="account-info-box">
                    <Button on:click={() => {passwordModal.showDialogClick()}}>Change Password</Button>
                </div>
            </div>
        </div>
    </div>
</div>

<Dialog bind:this={usernameModal}>
    <div id="username-dialog">
        <h2>Change Username</h2>
        <Textfield >New Username</Textfield>
        <Textfield >Confirm Password</Textfield>
        <div class="dialog-buttons">
            <Button on:click={() => {usernameModal.closeClick()}}>Close</Button>
            <Button>Change Username</Button>
        </div>
    </div>
</Dialog>


<Dialog bind:this={fullNameModal}>
    <div id="fullname-dialog">
        <h2>Change Full Name</h2>
        <Textfield >New Full Name</Textfield>
        <Textfield >Confirm Password</Textfield>
        <div class="dialog-buttons">
            <Button on:click={() => {fullNameModal.closeClick()}}>Close</Button>
            <Button>Change Full Name</Button>
        </div>
    </div>
</Dialog>

<Dialog bind:this={emailModal}>
    <div id="email-dialog">
        <h2>Change your Email here</h2>
        <Textfield >New Email</Textfield>
        <Textfield >Confirm Password</Textfield>
        <div class="dialog-buttons">
            <Button on:click={() => {emailModal.closeClick()}}>Close</Button>
            <Button>Change Email</Button>
        </div>
    </div>
</Dialog>

<!-- <Dialog bind:this={emailModal}>
    <div id="email-dialog">
        Change your email here.
        <div class="dialog-buttons">
            <Button on:click={() => {emailModal.closeClick()}}>Close</Button>
            <Button>Change Email</Button>
        </div>
    </div>
</Dialog> -->

<Dialog bind:this={passwordModal}>
    <div id="password-dialog">
        <h2>Change your Password here</h2>
        <Textfield >Old Password</Textfield>
        <Textfield >New Password</Textfield>
        <Textfield >Confirm Password</Textfield>
        <div class="dialog-buttons">
            <Button on:click={() => {passwordModal.closeClick()}}>Close</Button>
            <Button>Change Password</Button>
        </div>
    </div>
</Dialog>

<!-- <Dialog bind:this={passwordModal}>
    <div id="password-dialog">
        Change your password here.
        <div class="dialog-buttons">
            <Button on:click={() => {passwordModal.closeClick()}}>Close</Button>
            <Button>Change Password</Button>
        </div>

    </div>
</Dialog> -->

<style>
    .account-settings h1 {
        margin-bottom: 32px;
    }
    .account-image img {
        aspect-ratio: 1 / 1;
        width: 256px;
        height: 256px;
        object-fit: cover;
        border-radius: 50%;
    }
    .account-container {
        display: flex;
        flex-direction: row;
        gap: 64px;
    }
    .Account-Box {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .account-info-box {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    #username h2, #Full-Name h2, #Email h2, #Password h2{
        margin-bottom: 8px;
    }
    .dialog-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    #username-dialog, #fullname-dialog, #email-dialog, #password-dialog {
        padding: 100px, 100px;
        height: auto;
        width: 360px;
        border-radius: 5px;
		border-width: 1px;
		transition: all 2s;
        display: flex;
        flex-direction: column;
        gap: 16px; 
    }
    /* dialog {
		height: 250px;
		border-radius: 5px;
		border-width: 1px;
		transition: all 2s;
	}  
	dialog::backdrop {
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7));
    animation: fade-in 1s;
} */
</style>

