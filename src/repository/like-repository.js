import Like from "../models/like.js";
import crudRepository from "./crud-repository.js";

class LikeRepository extends crudRepository {

    constructor(){
        super(Like);
    }

    async finByUserAndAndLikeable(data){
        try 
        {
            const like = await Like.findOne(data);
            return like;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    async deleteOne(query) {
        return await Like.deleteOne(query);
    }

}

export default LikeRepository;