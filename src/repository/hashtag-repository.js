import Hashtag from "../models/hashtags.js";

class HashtagRepository {
    async create(data) {
        try {
            const tag = await Hashtag.create(data);
            return tag;
        } catch (err) {
            console.error("Error creating hashtag:", err);
        }
    }

    async bulkCreate(data) {
        try {
            const tags = await Hashtag.insertMany(data);
            return tags;
        } catch (err) {
            console.error("Error bulk creating hashtags:", err);
        }
    }

    async get(id) {
        try {
            const htag = await Hashtag.findById(id);
            return htag;
        } catch (err) {
            console.error("Error fetching hashtag:", err);
        }
    }

    async destroy(id) {
        try {
            const tag = await Hashtag.findByIdAndRemove(id);
            return tag;
        } catch (err) {
            console.error("Error deleting hashtag:", err);
        }
    }

    async findByName(titleList) {
        try {
            const tags = await Hashtag.find({ title: { $in: titleList } });
            return tags;
        } catch (err) {
            console.error("Error finding hashtags:", err);
            return [];
        }
    }

    async HashtagwithTweetId(id) {
        try {
            const tags = await Hashtag.find({ tweets : {$in : id} });
            return tags;
        } catch (err) {
            console.error("Error finding hashtags:", err);
            return [];
        }
    }
    
}

export default HashtagRepository;