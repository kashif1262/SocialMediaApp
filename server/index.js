import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extented: true }));
app.use(cors());

app.use("/posts", postRoutes);
const CONNECTIONURL =
  "mongodb://javascriptmastery:javascriptmastery123@ac-7dbzf7f-shard-00-00.g0eb1u9.mongodb.net:27017,ac-7dbzf7f-shard-00-01.g0eb1u9.mongodb.net:27017,ac-7dbzf7f-shard-00-02.g0eb1u9.mongodb.net:27017/?ssl=true&replicaSet=atlas-yrztgy-shard-0&authSource=admin&retryWrites=true&w=majority";

//const CONNECTIONURL =
//"mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.g0eb1u9.mongodb.net/?retryWrites=true&w=majority";
//const CONNECTIONURL =
//"mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.g0eb1u9.mongodb.net/test";
const PORT = process.env.PORT || 5000;

await mongoose
  .connect(CONNECTIONURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set("useFindAndModify", false);
