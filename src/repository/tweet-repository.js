const Tweet = require("../models/tweet");

class TweetRepository {
    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (err) {
            console.log(err);
        }
    }

    async get(id) {
        try {
            const tweet = await Tweet.findById(id);
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

    async destroy(id){
        try {
            const tweet = await Tweet.findByIdAndRemove(id);
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