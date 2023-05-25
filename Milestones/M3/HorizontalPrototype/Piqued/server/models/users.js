import db from "../databaseConnection.js";
import bcrypt from "bcrypt";

// const users = {};
const saltRounds = 10;

const createUserSQL = "INSERT INTO user(username, name, email, password) VALUES (?,?,?,?);"
const createProfile = "INSERT INTO profile (user, displayName) VALUE (?,?)";
const userExistSQL = "SELECT * FROM user WHERE username=?"
const emailExistSQL = "SELECT * FROM user WHERE email=?"
const authSQL = "SELECT userId, displayName, avatar, username,email,password,lastLogin FROM user JOIN profile ON profile.user = user.userId WHERE username = ?;"

const create = async (createUsername, createName, createEmail, createPassword) => {
    const hashedPassword = await bcrypt.hash(createPassword, saltRounds);
    return db.execute(createUserSQL, [createUsername, createName, createEmail, hashedPassword])
        .then(([results, fields]) => {
            db.execute(createProfile, [results.insertId, createUsername]);
            return Promise.resolve(results);

        }).catch((err) => Promise.reject(err))
};

const usernameExists = (username) => {
    return db.execute(userExistSQL, [username])
        .then(([results, fields]) => {
            return Promise.resolve(!results);
        })
        .catch((err) => Promise.reject(err));
}

const emailExists = (email) => {
    return db.execute(emailExistSQL, [email])
        .then(([results, fields]) => {
            return Promise.resolve(!results);
        })
        .catch((err) => Promise.reject(err));
}

const authenticate = (username,password) => {
    return db.execute(authSQL,[username]).then(async ([results, fields]) => {
        if (results) {
            const passwordsMatch = await bcrypt.compareSync(password, results[0].password);
            return passwordsMatch? Promise.resolve(results[0]):Promise.resolve(-1);
        }
        return Promise.resolve(-1);
    })
        .catch((err) => Promise.reject(err));
}


export default {create, usernameExists, emailExists, authenticate}; 
