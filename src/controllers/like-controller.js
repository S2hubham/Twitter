import LikeService from "../services/like-service.js";

const likeService = new LikeService();

export const toggleLike = async (req, res) => {
    try {
        const response = await likeService.toggleLike(req.query.modelId, req.query.modelType, req.body.userId);
        return res.status(200).json({
            success : true,
            message : "Successfully toggled like",
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