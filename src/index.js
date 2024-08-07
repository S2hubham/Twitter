const express = require("express");
const connect = require("./config/database");
const app = express();

const Tweet = require("./models/tweet");

app.listen(3000, async () => {
    console.log(`Server started`);
    await connect();
    console.log("mongodb connected");
    const tweets = await Tweet.find({content: ["first", "second tweet"]});
    console.log(tweets);
})