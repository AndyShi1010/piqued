import db from "../databaseConnection.js";

const postsModel = {};
const selectFrom = "SELECT posts.postId,displayName, title,body,unformatted_body AS simpleText, posts.lastModified,posts.createdAt,\n" +
    "category,wordCount,COUNT( DISTINCT postReaction.fk_userId) AS likes ,COUNT(DISTINCT comments.commentId) as commentCount, group_concat(DISTINCT tags.tag ORDER BY tags.tag ) as hashtags\n" +
    "FROM piquedDB.posts \n" +
    "JOIN piquedDB.profile ON profile.profile_id=posts.author\n" +
    "LEFT JOIN piquedDB.postReaction ON posts.postId = postReaction.fk_postId\n" +
    "LEFT JOIN piquedDB.hashtag ON posts.postId = hashtag.postId \n" +
    "LEFT JOIN piquedDB.tags on tags.tags_id=hashtag.tag\n "+
    "LEFT JOIN piquedDB.comments on posts.postId = comments.fk_postId ";

postsModel.create = (fk_user, postTitle, postBody, unformatted_body, postVisibility, allowComments, postCategory, wordCount, mediaPath,tags) => {
    const createPostSQL =
        "INSERT INTO piquedDB.posts (author,title,body, unformatted_body, visibility, commentsAllowed, category,wordCount) VALUE (?,?,?,?,?,?,?,?)";
    return db.execute(createPostSQL, [
        fk_user,
        postTitle,
        postBody,
        unformatted_body,
        postVisibility,
        allowComments,
        postCategory,
        wordCount,
    ]).then(async ([results, fields]) => {
        if (mediaPath) {
            const insertPicSQL = "INSERT INTO piquedDB.media (fk_postId, mediaPath) VALUE (?,?)";
            db.execute(insertPicSQL, [results.insertId, mediaPath])
        }
        if (tags) {
            const getTagIdIfExistsSQL = "SELECT tags_id from piquedDB.tags where tag = ?";
            const insertTagIfNotExistsSQL = "INSERT INTO piquedDB.tags (tag) VALUES (?)";
            const insertLinkSQL = "INSERT INTO piquedDB.hashtag (postId, tag) VALUES (?,?);"
            if (tags.length) {
                for (let i = 0; i < tags.length; i++) {
                    let getTag;
                    getTag = await db.execute(getTagIdIfExistsSQL,[tags[i]])
                        .then(([results, fields]) => {
                            if(results && results.length) {
                                return Promise.resolve(results[0].tags_id);
                            } else{ return Promise.resolve(0);}
                        })
                        .catch((err) => Promise.reject(err))
                    if(!getTag){
                         getTag = await db.execute(insertTagIfNotExistsSQL,[tags[i]])
                            .then(([results, fields]) => {
                                return Promise.resolve(results.insertId);
                            })
                            .catch((err) => Promise.reject(err))
                    }
                    if(getTag){
                        db.execute(insertLinkSQL,[results.insertId,getTag]);
                    }
                }
            }
        }
        return Promise.resolve(results.affectedRows);

    }).catch((err) => Promise.reject(err))
};
postsModel.getProfilePosts = (profileName) => {
    const getProfilePosts = selectFrom +
        "WHERE posts.postId = (SELECT profile_id from piquedDB.profile WHERE displayName = ? )\n" +
        "GROUP BY posts.postId;"
    return db.execute(getProfilePosts, [profileName])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}
postsModel.getProfileLikedPosts = (profileName) => {
    const getProfileLikedPosts = selectFrom +
        "WHERE postReaction.fk_userId = (SELECT profile_id from piquedDB.profile WHERE displayName = ? )\n" +
        "GROUP BY posts.postId" +
        "ORDER BY postReaction.lastModified DESC;"
    return db.execute(getProfileLikedPosts, [profileName])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}

postsModel.getPostById = (getById) => {
    const getPostSQL = selectFrom +" WHERE posts.postId = ?";
    return db.execute(getPostSQL, [getById])
        .then(([results, fields]) => {
            if(results && results[0].postId){
                return Promise.resolve(results[0]);}
            else{return Promise.reject(0);}
        })
        .catch((err) => Promise.reject(err))
}

postsModel.getNPosts = (n) => {
    const getNPostsSQL = selectFrom + " LIMIT ? ;";
    let sql = db.format(getNPostsSQL, [n])
    return db.execute(sql)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}

postsModel.searchPostsByKeyword = (query) => {
    const searchByKeywordSQL = selectFrom +
        " WHERE unformatted_body LIKE ? OR title LIKE ?  OR category LIKE ? OR displayName LIKE ? GROUP BY posts.postId "
    let like = "%" + query + "%";
    let sql = db.format(searchByKeywordSQL, [like, like, like,like]);
    return db.execute(sql)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}

postsModel.searchPostsByHashTag = (hashtag) => {
    const searchByHashTagSQL = selectFrom + "WHERE posts.postId IN (SELECT posts.postId FROM piquedDB.posts " +
        "LEFT JOIN piquedDB.hashtag ON posts.postId = hashtag.postId LEFT JOIN piquedDB.tags on tags.tags_id=hashtag.tag"+
   " WHERE tags.tag = ?) GROUP BY posts.postId";

    let sql = db.format(searchByHashTagSQL, [hashtag])
    return db.execute(sql)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}

export default postsModel;