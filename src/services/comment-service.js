import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService{
    constructor(){
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async createComment(modelId, modelType, userId, content){ // /api/v1/comments?modelId=modelId&modelType=Tweet|comment
        if (modelType == "Tweet") {
            var commentable = await this.tweetRepository.get(modelId);
        }
        
        else if(modelType == "Comment"){
            var commentable = await this.commentRepository.get(modelId);
        }
        else{
            throw new Error("Unknown model type");
        }

        const newComment = await this.commentRepository.create({
            userId : userId,
            content : content,
            onModel : modelType,
            commentable : modelId,
            comments : []
        }); 

        commentable.comments.push(newComment);
        await commentable.save();

        return newComment;
    }
}

export default CommentService;