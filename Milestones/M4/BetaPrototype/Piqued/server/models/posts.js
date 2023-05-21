import db from "../databaseConnection.js";

const postsModel = {};

postsModel.create = (fk_user, postTitle, postBody, unformatted_body, postVisibility, allowComments, postCategory, wordCount, mediaPath) => {
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
    ]).then(([results, fields]) => {
        if (mediaPath) {
            const insertPicSQL = "INSERT INTO piquedDB.media (fk_postId, mediaPath) VALUE (?,?)";
            db.execute(insertPicSQL, [results.insertId, mediaPath])
        }
        return Promise.resolve(results);

    }).catch((err) => Promise.reject(err))
};
postsModel.getProfilePosts = (profileName) => {
    const getProfilePosts = "SELECT posts.postId,displayName, title,body,unformatted_body AS simpleText, visibility, commentsAllowed,posts.lastModified,posts.createdAt,\n" +
        "category,wordCount,COUNT(reactionType) AS likes, group_concat(DISTINCT tags.tag ORDER BY tags.tag) as hashtags\n" +
        "FROM piquedDB.posts \n" +
        "JOIN piquedDB.profile ON profile.profile_id=posts.author\n" +
        "LEFT JOIN piquedDB.postReaction ON posts.postId = postReaction.fk_postId\n" +
        "LEFT JOIN piquedDB.hashtag ON posts.postId = hashtag.postId \n" +
        "LEFT JOIN piquedDB.tags on tags.tags_id=hashtag.tag\n" +
        "WHERE posts.postId = (SELECT profile_id from piquedDB.profile WHERE displayName = ? )\n" +
        "GROUP BY posts.postId;"
    return db.execute(getProfilePosts, [profileName])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}
postsModel.getProfileLikedPosts = (profileName) => {
    const getProfileLikedPosts = "SELECT posts.postId,displayName, title,body,unformatted_body AS simpleText, visibility, commentsAllowed,posts.lastModified,posts.createdAt,\n" +
        "category,wordCount,COUNT(reactionType) AS likes, group_concat(DISTINCT tags.tag ORDER BY tags.tag) as hashtags\n" +
        "FROM piquedDB.posts \n" +
        "JOIN piquedDB.profile ON profile.profile_id=posts.author\n" +
        "LEFT JOIN piquedDB.postReaction ON posts.postId = postReaction.fk_postId\n" +
        "LEFT JOIN piquedDB.hashtag ON posts.postId = hashtag.postId \n" +
        "LEFT JOIN piquedDB.tags on tags.tags_id=hashtag.tag\n" +
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
    const getPostSQL = "SELECT posts.postId, displayName, title,body,unformatted_body AS simpleText, visibility, commentsAllowed,posts.lastModified,posts.createdAt,\n" +
        "    category,wordCount,COUNT(reactionType) AS likes, group_concat(DISTINCT tags.tag ORDER BY tags.tag) as hashtags\n" +
        "    FROM piquedDB.posts \n" +
        "    JOIN piquedDB.profile ON profile.profile_id=posts.author\n" +
        "    LEFT JOIN piquedDB.postReaction ON posts.postId = postReaction.fk_postId\n" +
        "    LEFT JOIN piquedDB.hashtag ON posts.postId = hashtag.postId \n" +
        "    LEFT JOIN piquedDB.tags on tags.tags_id=hashtag.tag\n"
        +" WHERE posts.postId = ?";
    return db.execute(getPostSQL, [getById])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}

postsModel.getNPosts = (n) => {
    const getNPostsSQL = "SELECT posts.postId, displayName, title,body,unformatted_body AS simpleText, visibility, commentsAllowed,posts.lastModified,posts.createdAt,\n" +
    "    category,wordCount,COUNT(reactionType) AS likes, group_concat(DISTINCT tags.tag ORDER BY tags.tag) as hashtags\n" +
    "    FROM piquedDB.posts \n" +
    "    JOIN piquedDB.profile ON profile.profile_id=posts.author\n" +
    "    LEFT JOIN piquedDB.postReaction ON posts.postId = postReaction.fk_postId\n" +
    "    LEFT JOIN piquedDB.hashtag ON posts.postId = hashtag.postId \n" +
    "    LEFT JOIN piquedDB.tags on tags.tags_id=hashtag.tag\n" +
        " LIMIT ? ;";
    let sql = db.format(getNPostsSQL, [n])
    return db.execute(sql)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}

postsModel.searchPostsByKeyword = (query) => {
    const searchByKeywordSQL = "SELECT posts.postId, displayName, title,body,unformatted_body AS simpleText, visibility, commentsAllowed,posts.lastModified,posts.createdAt,\n" +
        "    category,wordCount,COUNT(reactionType) AS likes, group_concat(DISTINCT tags.tag ORDER BY tags.tag) as hashtags\n" +
        "    FROM piquedDB.posts \n" +
        "    JOIN piquedDB.profile ON profile.profile_id=posts.author\n" +
        "    LEFT JOIN piquedDB.postReaction ON posts.postId = postReaction.fk_postId\n" +
        "    LEFT JOIN piquedDB.hashtag ON posts.postId = hashtag.postId \n" +
        "    LEFT JOIN piquedDB.tags on tags.tags_id=hashtag.tag\n" +
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
    const searchByHashTagSQL = "SELECT posts.postId, displayName, title,body,unformatted_body AS simpleText, visibility, commentsAllowed,posts.lastModified,posts.createdAt,\n" +
        "    category,wordCount,COUNT(reactionType) AS likes, group_concat(DISTINCT tags.tag ORDER BY tags.tag) as hashtags\n" +
        "    FROM piquedDB.posts \n" +
        "    JOIN piquedDB.profile ON profile.profile_id=posts.author\n" +
        "    LEFT JOIN piquedDB.postReaction ON posts.postId = postReaction.fk_postId\n" +
        "    LEFT JOIN piquedDB.hashtag ON posts.postId = hashtag.postId \n" +
        "    LEFT JOIN piquedDB.tags on tags.tags_id=hashtag.tag\n" +
        "    WHERE tags.tag= ? \n" +
        "    GROUP BY posts.postId"

    let sql = db.format(searchByHashTagSQL, [hashtag])
    return db.execute(sql)
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err))
}

export default postsModel;