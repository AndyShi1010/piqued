import db from "../database.js";
const posts = {};

const createPostSQL =
    "INSERT INTO piquedDB.posts (author,title,body, visibility, commentsAllowed, category) VALUE (?,?,?,?,?,?)";

const insertPicSQL = "INSERT INTO piquedDB.media (fk_postId, mediaPath) VALUE (?,?)";

const getPostSQL = "SELECT displayName, title,body, visibility, commentsAllowed,posts.lastModified,posts.createdAt," +
    "category,wordCount FROM piquedDB.posts JOIN piquedDB.profile ON profile.profileID=posts.author WHERE postId = ?";

const getNPostsSQL = "SELECT displayName, title,body, visibility, commentsAllowed,posts.lastModified,posts.createdAt," +
    "category,wordCount FROM piquedDB.posts JOIN piquedDB.profile ON profile.profileID=posts.author ORDER BY lastModified DESC LIMIT ? ;";

const searchSQL = "SELECT displayName, title,body, visibility, commentsAllowed,posts.lastModified,posts.createdAt," +
    "category,wordCount FROM piquedDB.posts JOIN piquedDB.profile ON profile.profileID=posts.author WHERE ?? LIKE ?"

posts.create  = (fk_user, postTitle, postBody, postVisibility, allowComments, postCategory,mediaPath) => {
    return db.execute(createPostSQL, [
        fk_user,
        postTitle,
        postBody,
        postVisibility,
        allowComments,
        postCategory
    ]).then(([results, fields]) => {
        if(mediaPath){
            db.execute(insertPicSQL,[results.insertId,mediaPath])
        }
        return Promise.resolve(results);

    }).catch((err) => Promise.reject(err))
};

posts.getPostById = (getById) => {
    return db.execute(getPostSQL, [getById])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err)=> Promise.reject(err))
}

posts.getNPosts = (n) =>{
    let sql = db.format(getNPostsSQL,[n])
    return db.execute(sql)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err)=> Promise.reject(err))
}

posts.searchPosts = (by, query) => {
    let like = "%"+query + "%";
    let sql = db.format(searchSQL,[by,like]);
    return db.execute(sql)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err)=> Promise.reject(err))
}

export default posts;