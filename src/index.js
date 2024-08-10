import express from "express";
import bodyParser from "body-parser";

import { connect } from "./config/database.js";
import apiRoutes from "./routes/index.js";

const app = express();

import {UserRepository, TweetRepository} from "./repository/index.js"
import LikeService from "./services/like-service.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(3000, async () => {
    console.log(`Server started`);
    await connect();
    console.log("mongodb connected");

    const userRepo = new UserRepository();
    const tweetRepo = new TweetRepository();
    const tweets = await tweetRepo.getAll(0, 10);
    const user = await userRepo.create({
        email : "abc@gmail.com",
        password : "shubham",
        name : "shubh"
    });

    const likeService = new LikeService();
    await likeService.toggleLike(tweets[0].id, "Tweet", user.id);

});
