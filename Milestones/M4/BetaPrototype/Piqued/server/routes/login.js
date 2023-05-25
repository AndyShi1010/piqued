import express from "express";
import bcrypt from "bcrypt"
import Users from "../../server/models/users.js";

const router = express.Router();

// router.use("/login", (req, res) => {
//     res.redirect('/#/login');
// })

router.get("/", (req, res) => {
    res.redirect('/#/login');
});

// router.post("/#/login", async (request, response) => {
//     const { username, email, password } = request.body;
//     const authenticate = Users.authenticate(username, password);

//     console.log("Login route");
//     try {
//         if (authenticate) {
//             response.redirect("/#/account");
//         } else {
//             response.send("Error logging in")
//             throw "Credentials invalid";
//         }
//     } catch (error) {
//         console.log({ error });
//         response.render("login");
//     }

// });

router.post("/", async (req, res) => {
    console.log("Login api")
    const { usernameEmail, password } = req.body;
    console.log(usernameEmail, password)
    try {
        const authenticate = Users.authenticate(usernameEmail, password);
        if (authenticate) {
            // res.locals.logged = true;
            // res.locals.username = authenticate;
            // console.log(res.locals)
            res.status(200).send("Authenticated")
            // response.redirect("/#/account");
        } else {
            response.status(401).send("Error logging in")
            throw "Credentials invalid";
        }
    } catch (error) {
        console.log({ error });
    }
    // res.status(200).send("Authenitcated")
    
    // res.redirect("/#/terms")
})

export default router;