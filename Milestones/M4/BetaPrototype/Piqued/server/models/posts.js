import db from "../databaseConnection.js";
const postsmodel = {};

const createPostSQL =
    "INSERT INTO piquedDB.posts (author,title,body, unformatted_body, visibility, commentsAllowed, category,wordCount) VALUE (?,?,?,?,?,?,?,?)";

const insertPicSQL = "INSERT INTO piquedDB.media (fk_postId, mediaPath) VALUE (?,?)";

const getPostSQL = "SELECT displayName, title,body, visibility, commentsAllowed,posts.lastModified,posts.createdAt," +
    "category,wordCount FROM piquedDB.posts JOIN piquedDB.profile ON profile.profile_id=posts.author WHERE postId = ?";

const getNPostsSQL = "SELECT displayName, title,body, visibility, commentsAllowed,posts.lastModified,posts.createdAt,\n" +
    "category,wordCount,COUNT(reactionType) AS likes FROM piquedDB.posts JOIN piquedDB.profile ON profile.profile_id=posts.author\n" +
    "LEFT JOIN piquedDB.postReaction ON posts.postId = postReaction.fk_postId GROUP BY posts.postId LIMIT ? ;";
    // "SELECT displayName, title,body, visibility, commentsAllowed,posts.lastModified,posts.createdAt," +
    // "category,wordCount FROM piquedDB.posts JOIN piquedDB.profile ON profile.profileID=posts.author LIMIT ? ;";
//ORDER BY lastModified DESC LIMIT ?
const searchSQL = "SELECT displayName, title,body,unformatted_body AS simpleText, visibility, commentsAllowed,posts.lastModified,posts.createdAt,\n" +
    "category,wordCount,COUNT(reactionType) AS likes FROM piquedDB.posts JOIN piquedDB.profile ON profile.profile_id=posts.author\n" +
    "LEFT JOIN piquedDB.postReaction ON posts.postId = postReaction.fk_postId WHERE ?? LIKE ? GROUP BY posts.postId "

postsmodel.create  = (fk_user, postTitle, postBody,unformatted_body, postVisibility, allowComments, postCategory,wordCount,mediaPath) => {
    return db.execute(createPostSQL, [
        fk_user,
        postTitle,
        postBody,
        unformatted_body,
        postVisibility,
        allowComments,
        postCategory,
        wordCount,
    ]).then(([results, fields]) => {
        if(mediaPath){
            db.execute(insertPicSQL,[results.insertId,mediaPath])
        }
        return Promise.resolve(results);

    }).catch((err) => Promise.reject(err))
};

postsmodel.getPostById = (getById) => {
    return db.execute(getPostSQL, [getById])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err)=> Promise.reject(err))
}

postsmodel.getNPosts = (n) =>{
    let sql = db.format(getNPostsSQL,[n])
    return db.execute(sql)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err)=> Promise.reject(err))
}

postsmodel.searchPosts = (by, query) => {
    let like = "%"+query+"%";
    let sql = db.format(searchSQL,[by,like]);
    console.log("Search posts")
    return db.execute(sql)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err)=> Promise.reject(err))
}

export default postsmodel;