import express from "express";
import usersModel from '../models/users.js';

const router = express.Router();

router.post("/change-username", async (req, res) => {
    let userId;
    let userNameToChangeTo;
    let password;
    let message;

    const checkPassword = await usersModel.passwordCheck(userId, password);
    if (!checkPassword) {
        message = "Incorrect password"
        res.status(400).json({message});
    } else {
        const usernameUnavailable = await usersModel.usernameExists(userNameToChangeTo)
        if (usernameUnavailable) {
            message = "Username is already taken.";
            res.status(400).json(message);
        } else {
            const update = await usersModel.updateUsersName(userNameToChangeTo, userId);
            if (update) {
                message = "Username has been updated!";
                res.status(200).json(message);
            } else {
                message = "Server error updating user credentials";
                res.status(500).json(message);
            }
        }
    }
})

router.post("/change-password", async (req, res) => {
    let userId;
    let password, newPassword;
    let message;

    const checkPassword = await usersModel.passwordCheck(userId, password);
    if (!checkPassword) {
        message = "Incorrect password"
        res.status(400).json({message});
    } else {
        const passwordUpdated = await usersModel.updatePassword(userId,newPassword);
        if(passwordUpdated){
            message = "Password has been updated!";
            res.status(200).json(message);
        } else {
            message = "Server error updating user credentials";
            res.status(500).json(message);
        }
    }
})

router.post("/change-name", async (req, res) => {
    let fullName, userId;
    let password;
    let message;

    const checkPassword = await usersModel.passwordCheck(userId, password);
    if (!checkPassword) {
        message = "Incorrect password"
        res.status(400).json({message});
    } else {
        const nameUpdated = await usersModel.updateName(userId,fullName);
        if(nameUpdated){
            message = "Your name has been updated!";
            res.status(200).json(message);
        } else {
            message = "Server error updating user credentials";
            res.status(500).json(message);
        }
    }
})

router.post("/change-email", async (req, res) => {
    let email, userId;
    let password;
    let message;

    const checkPassword = await usersModel.passwordCheck(userId, password);
    if (!checkPassword) {
        message = "Incorrect password"
        res.status(400).json({message});
    } else {
        const emailUpdated = await usersModel.updateEmail(userId,email);
        if(emailUpdated){
            message = "Your email has been updated!";
            res.status(200).json(message);
        } else {
            message = "Server error updating user credentials";
            res.status(500).json(message);
        }
    }
})

router.post("/change-pfp", async (req, res) => {
    let userId;
    let pfp;
    let message;

        const pfpUpdated = await usersModel.updateProfilePic(userId,pfp);
        if(pfpUpdated){
            message = "Your profile picture has been updated!";
            res.status(200).json(message);
        } else {
            message = "Server error updating user picture";
            res.status(500).json(message);
        }

})


export default router;