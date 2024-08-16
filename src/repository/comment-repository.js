import crudRepository from "./crud-repository.js";

import Comment from "../models/comment.js";

class CommentRepository extends crudRepository{
    constructor(){
        super(Comment);
    }

    async findAndPopulateLikes(id) {
        try {
            const comment = await Comment.findById(id).populate({path: 'likes'});
            return comment;
        } catch (error) {
            console.log(error);
        }
    }
}

export default CommentRepository;