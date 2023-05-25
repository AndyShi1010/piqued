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
            return Promise.resolve(results.length);
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
const passwordCheck = (userId, password) => {
    const getPassword = "SELECT password from piquedDB.user WHERE username = ?";
    return db.execute(getPassword,[userId])
        .then(([results, fields]) => {
            return bcrypt.compareSync(password, results[0].password);
        }).catch((err) => Promise.reject(err));
}
const updateUsersName = (updatedName,userId) => {
    const updateUserSql = "UPDATE piquedDB.user SET username = ? WHERE userId = ?";
    return db.execute(updateUserSql,[updatedName,userId])
        .then(([results, fields]) => {
            return results.affectedRows;
        }).catch((err) => Promise.reject(err));
}

const updatePassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const updatePasswordSQL = "UPDATE piquedDB.user SET password = ? WHERE userId = ?"
    return db.execute(updatePasswordSQL, [hashedPassword, userId])
        .then(([results, fields]) => {
            return results.affectedRows;
        }).catch((err) => Promise.reject(err));
}

const updateName = async (userId,fullName) => {
    const fullNameSQL = "UPDATE piquedDB.user SET name = ? WHERE userId = ?"
    return db.execute(fullNameSQL,[fullName,userId])
        .then(([results, fields]) => {
            return results.affectedRows;
        }).catch((err) => Promise.reject(err));
}

const updateEmail = async (userId,email) => {
    const emailSQL = "UPDATE piquedDB.user SET email = ? WHERE userId = ?"
    return db.execute(emailSQL,[email,userId])
        .then(([results, fields]) => {
            return results.affectedRows;
        }).catch((err) => Promise.reject(err));
}
const updateProfilePic = async (userId,pfp) => {
    const updatePFPsql = "UPDATE piquedDB.profile SET avatar = ? " +
        "WHERE user = (SELECT userId  FROM piquedDB.user WHERE userId = ?);"
    return db.execute(updatePFPsql,[pfp,userId])
        .then(([results, fields]) => {
            return results.affectedRows;
        }).catch((err) => Promise.reject(err));
}

export default {create, usernameExists, emailExists, authenticate, getUser, updateUsersName, passwordCheck
,updatePassword, updateName,updateEmail,updateProfilePic};
