<script>
    import Button from "../lib/Button.svelte";
    import Footer from "../lib/Footer.svelte";
</script>


<div class="account-settings">
    <h1>Account Settings</h1>
    <div class="account-container">
        <div class="account-image">
            <img src="../img/burger.jpg" alt="description of image" width="300" height="200">
        </div>
        <div class="Account-Box">
            <div class="username">
                <h1>Username</h1>
                <div>
                    <h2>Username Lorem Ipsum</h2>
                    <Button>Edit</Button>
                </div>
            </div>
            <div class="Full-Name">
                <h1>Full Name</h1>
                <div>
                    <h2>Full Name Lorem Ipsum</h2>
                    <Button>Edit</Button>
                </div>
            </div>
            <div class="Email">
                <h1>Email</h1>
                <div>
                    <h2>Email Lorem Ipsum</h2>
                    <Button>Edit</Button>
                </div>
            </div>
            <div class="Password">
                <h1>Password</h1>
                <div>
                    <Button>Change Password</Button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .account-settings h1 {
        margin-bottom: 32px;
    }
    .account-container {
        display: flex;
        flex-direction: row;
    }
</style>
