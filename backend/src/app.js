const express = require("express");

const app = express();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config();
}

// Routes import
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// cors cofiguration
if (process.env.NODE_ENV !== "PRODUCTION") {
    app.use(
        require("cors")({
            origin: process.env.FRONTEND_URL,
            optionsSuccessStatus: 200,
            credentials: true,
        })
    );
}

app.use("/api/v2/users", userRoute);
app.use("/api/v2/posts", postRoute);


// error middileware
app.use(errorMiddleware);

module.exports = app;