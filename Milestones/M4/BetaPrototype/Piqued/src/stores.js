import { writable } from 'svelte/store';

export const username = writable(getUsername());

function getUsername () {
    const id = localStorage.getItem("userid");
    console.log("Get username", id)
    let username
    if (id) {
        fetch(`/login/id`, 
        {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userid": id
            })
        }).then((response) => {
            response.json()
            .then((json) => {
                console.log(json);
                username = json.username;
                // username.set(json.username);
            })
        })
        console.log(username);
        return username
    } 
    return "undefined"
}