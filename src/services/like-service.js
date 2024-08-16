import Tweet from "../models/tweet.js";
import {TweetRepository, LikeRepository, CommentRepository} from "../repository/index.js";

class LikeService {
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId, modelType, userId){ // /api/v1/likes/toggle?id=modelid&type=Tweet
        if (modelType == "Tweet") {
            var likeable = await this.tweetRepository.findAndPopulateLikes(modelId);
        }
        
        else if(modelType == "Comment"){
            var likeable = await this.commentRepository.findAndPopulateLikes(modelId);
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
            likeable.likes.pull(exist._id);
            await likeable.save();

            // instead of remove use destroy to remove the like from the Like collection
            await this.likeRepository.destroy(exist._id);
            var isAdded = false;
        }

        // if like doesn't exist in the tweet or comment 
        // then save the new like 
        else{
            const newLike = await this.likeRepository.create({
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