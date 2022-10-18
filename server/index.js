import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extented: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT;
const CONNECTIONURL = process.env.CONNECTION_URL;
//const CONNECTIONURL =
//"mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.g0eb1u9.mongodb.net/?retryWrites=true&w=majority";
//const CONNECTIONURL =
//"mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.g0eb1u9.mongodb.net/test";

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
