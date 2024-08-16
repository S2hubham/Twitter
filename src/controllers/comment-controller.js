import CommentServiceService from "../services/comment-service.js";

const commentService = new CommentServiceService();

// localhost:3000/api/v1/comments?modelId=modelId&modelType=Tweet|comment

export const createComment = async (req, res) => {
    try {
        const response = await commentService.createComment(req.query.modelId, req.query.modelType, req.body.userId, req.body.content);
        return res.status(200).json({
            success : true,
            message : "Created a new comment",
            data : response,
            err : {},
        }) 
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            data : {},
            err : error,
        }) 
    }
}