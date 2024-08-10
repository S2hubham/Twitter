import Tweet from "../models/tweet.js";
import {TweetRepository, LikeRepository} from "../repository/index.js";

class LikeService {
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId){
        if(modelType == "Tweet"){
            var likeable = await Tweet.findById(modelId).populate({path : "likes"});
            
        }
        else if(modelType == "Comment"){
            // TODO
        }
        else{
            throw new Error("Unknown model type");
        }

        // first get the id of like from like repository 
        const exist = await this.likeRepository.finByUserAndAndLikeable({
            user : userId,
            onModel : modelType,
            likeable : modelId
        });

        // if like exist in the tweet or comment
        // then pull it from the database and delete the id 
        if(exist){
            likeable.likes.pull(exist.id);
            await likeable.save();
            await exist.remove();
            var isAdded = false;
        }

        // if like doesn't exist in the tweet or comment 
        // then save the new like 
        else{
            const newLike = this.likeRepository.create({
                user : userId,
                onModel : modelType,
                likeable : modelId
            });
            likeable.likes.push(newLike);
            await likeable.save();
            var isAdded = true;
        }

        return isAdded;
    }


}

export default LikeService;