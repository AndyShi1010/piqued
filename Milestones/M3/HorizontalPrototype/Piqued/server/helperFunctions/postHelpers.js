function parsePostBody(formattedText){
    let split1 = formattedText.replaceAll(/^((?!"text":).)*$/gm,"");
    split1 = split1.replaceAll("\"text\":","");
    split1 = split1.replaceAll(/\s+/g,' ').trim();
    return split1;
}

function sortPosts(arrayOfPosts,sortBy){
    if(sortBy==="likes"){
        return arrayOfPosts.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0));
    }
    else if(sortBy==="newest"){
        return arrayOfPosts.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0));
    }
    else{ //Sort By relevance [default]
        return arrayOfPosts.sort((a,b)=> {

            const regex = new RegExp(sortBy,"gi");
            const aMatch = a.simpleText.match(regex);
            const bMatch = b.simpleText.match(regex);
            let aTitleMatch = a.title.match(regex);
            let bTitleMatch = b.title.match(regex);

            //make array empty with length 0 instead of null
            if(!aTitleMatch) aTitleMatch= [];
            if(!bTitleMatch) bTitleMatch= [];

            if(!aMatch || !bMatch){ //null checks -> sort by likes
                if(!bMatch && !aMatch) {return (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0);} //Both null
                return (!aMatch) ? 1 : -1; //aIsNull && bIsNotNull -> a<b ; a>b if false
            }
            else{
                if((aTitleMatch.length*2 + aMatch.length) < ((bTitleMatch.length*2) + bMatch.length)) return 1; //b has more usages of word
                else if((bTitleMatch.length*2 + bMatch.length) < ((aTitleMatch.length*2) + aMatch.length)) return -1; //b has fewer usages of word
                else{
                    return (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0); //word usages are equal-> order by likes
                }
            }
        });
    }
}
export {parsePostBody, sortPosts};
