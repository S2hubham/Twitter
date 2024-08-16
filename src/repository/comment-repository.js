import crudRepository from "./crud-repository.js";

import Comment from "../models/comment.js";

class CommentRepository extends crudRepository{
    constructor(){
        super(Comment);
    }
}

export default CommentRepository;