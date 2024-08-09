import {TweetRepository, LikeRepository} from "../repository/index.js";

class LikeService {
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLink(modelId, modelType, userId){
        if(modelType == "Tweet"){
            var likeable = await this.tweetRepository.get(modelId).populate("likes");
            return 
        }
        else if(modelType == "Comment"){

        }
        else{
            throw new Error("Unknown model type");
        }
    }


}

export default LikeService;