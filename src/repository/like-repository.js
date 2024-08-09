import Like from "../models/like.js";
import crudRepository from "./crud-repository.js";

class LikeRepository extends crudRepository {

    constructor(){
        super(Like);
    }

}

export default LikeRepository;