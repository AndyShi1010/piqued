import db from "../databaseConnection.js";
import bcrypt from "bcrypt";

// const users = {};
const saltRounds = 10;

const createUserSQL = 'INSERT INTO user (username, name, email, password, lastLogin, createdAt) VALUES (?,?,?,?, now(), now())'
const createProfile = "INSERT INTO profile (user, displayName) VALUE (?,?)"
const userExistSQL = "SELECT * FROM user WHERE username=?"
const emailExistSQL = "SELECT * FROM user WHERE email=?"
const authSQL = "SELECT userId, displayName, avatar, username,email,password,lastLogin FROM user JOIN profile ON profile.user = user.userId WHERE username = ?"
const getUserSQL = "SELECT username, email FROM user WHERE userId=?"

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

const authenticate = async (username,password) => {
    let userID;
    return db.execute(authSQL,[username]).then(async ([results, fields]) => {
        if (results && results.length == 1) {
            userID = results[0].userId
            console.log("usrId", results[0])
            return bcrypt.compareSync(password, results[0].password);
            // const passwordsMatch = await bcrypt.compareSync(password, results[0].password);
            // return passwordsMatch? Promise.resolve(results[0].id):Promise.resolve(-1);
        } else {
            return Promise.resolve(-1);
        }
    })
    .then((passwordMatch) => {
        if(passwordMatch) {
            return Promise.resolve(userID);
        }else {
            return Promise.resolve(-1);
        }
    })
        .catch((err) => Promise.reject(err));
}

const getUser = (userId) => {
    // console.log(userId);
    try {
        if (userId) {
            return db.execute(getUserSQL, [userId])
            .then(([results, fields]) => {
                console.log(results);
                if (results && results.length == 1) {
                    return results[0];
                } else {
                    return Promise.resolve(-1);
                }
            })
            .catch((err) => Promise.reject(err));
        } else {
            throw "UserID invalid"
        }
    } catch (error) {
        console.log({ error });
        Promise.resolve(-1);
    }
    


}


export default {create, usernameExists, emailExists, authenticate, getUser}; 
