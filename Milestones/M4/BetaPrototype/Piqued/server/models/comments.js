import db from "../databaseConnection.js";

const commentsModel = {};
commentsModel.createComment = (userid, postid,comment)=>{
    const createCommentSQL = "INSERT INTO piquedDB.comments (fk_userId, fk_postId, comment) VALUES (?,?,?)"
    return db.execute(createCommentSQL,[userid,postid,comment])
        .then(([results, fields]) => {
            if (results){return Promise.resolve(results);}
            return Promise.reject(-1);
    })
        .catch((err) => Promise.reject(err))
}

commentsModel.getPostComments = (postId) => {
    const getCommentsSQL = "SELECT comment FROM piquedDB.comments WHERE fk_postId = ?"
    return db.execute(getCommentsSQL,[postId])
        .then(([results, fields]) => {
            if (results && results.length){return Promise.resolve(results);}
            return Promise.resolve(null);
        })
        .catch((err) => Promise.reject(err))
}
export default commentsModel;