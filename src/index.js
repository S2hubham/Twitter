import express from "express";
import {connect} from "./config/database.js"
const app = express();

import TweetService from "./services/tweet-service.js";

app.listen(3000, async () => {
    console.log(`Server started`);
    await connect();
    console.log("mongodb connected");
    let ser = new TweetService();
    await ser.create({content : "Done with #refactor"})
})