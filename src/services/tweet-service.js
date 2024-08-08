import {TweetRepository, HashtagRepository} from "../repository/index.js"

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;
        const tags = content
            .match(/#[a-zA-Z0-9_]+/g)
            .map((tag) => tag.substring(1));
        const tweet = await this.tweetRepository.create(data);

        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPresenttags = alreadyPresentTags.map((tag) => tag.title);

        let newTags = tags.filter((tag) => !titleOfPresenttags.includes(tag));
        newTags = newTags.map((tag) => {
            return { title: tag, tweets: [tweet.id] };
        });

        await this.hashtagRepository.bulkCreate(newTags);

        // Update existing tags with new tweet ID
        alreadyPresentTags.forEach(async (tag) => {
            tag.tweets.push(tweet.id);
            await tag.save();
        });

        // Fetch all tags with IDs
        const allTags = await this.hashtagRepository.HashtagwithTweetId(tweet.id); // Include new tags as well
        console.log("All Tags with IDs:", allTags);

        // Extract IDs
        const hashtagIds = allTags.map((tag) => tag._id);
        console.log("Hashtag IDs:", hashtagIds);

        // Update the tweet with hashtag IDs
        tweet.hashtags = hashtagIds;
        await tweet.save();

        return tweet;

        // todo create hashtag and add here
        /* 
        1.bulkcreate in mongoose
        2.filter title of hashtag based on multiple tags
        3.how to add tweet id inside all the hashtags
        */
    }
}

export default TweetService;
