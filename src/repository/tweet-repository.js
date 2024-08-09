import Tweet from "../models/tweet.js";
import crudRepository from "./crud-repository.js";

class TweetRepository extends crudRepository {

    constructor(){
        super(Tweet);
    }

    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (err) {
            console.log(err);
        }
    }

    async getWithComments(id){
        try {
            const tweet = await Tweet.findById(id).populate({path: "comments"}).lean();
            return tweet;
        } catch (err) {
            console.log(err);
        }
    }

    async getAll(offset, limit){
        try {
            const tweet = await Tweet.find().skip(offset).limit(limit);
            return tweet;
        } catch (err) {
            console.log(err);
        }
    }
}

export default TweetRepository;