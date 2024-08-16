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


    async recursivePopulate(model, doc, path) {
        const populatedDoc = await model.populate(doc, {
            path,
            populate: {
                path,
                populate: {
                    path,
                    // Continue this pattern if necessary
                }
            }
        });

        if (populatedDoc[path] && populatedDoc[path].length > 0) {
            for (let i = 0; i < populatedDoc[path].length; i++) {
                populatedDoc[path][i] = await this.recursivePopulate(model, populatedDoc[path][i], path);
            }
        }
        return populatedDoc;
    }

    async getWithComments(id){
        try {
            let tweet = await Tweet.findById(id).populate({path: "comments"}).lean();
            tweet = await this.recursivePopulate(Tweet, tweet, 'comments');
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

    async findAndPopulateLikes(id) {
        try {
            const tweet = await Tweet.findById(id).populate({path: 'likes'});
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}

export default TweetRepository;