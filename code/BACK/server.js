const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./_middleware/error-handler");
const path = require("path");
require("dotenv").config();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        /*origin: [
            "http://localhost:8080",
            // TODO add server ip ex: "https://dev-suivio-front-u353.vm.elestio.app",
        ],*/
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
// for storage
app.use("/", express.static(path.join(__dirname, "/")));

// api routes
app.use("/users", require("./users/users.controller"));
app.use("/themes", require("./themes/themes.controller"));
app.use("/courses", require("./courses/courses.controller"));
app.use("/chapters", require("./chapters/chapters.controller"));
app.use("/userChapters", require("./userChapters/userChapters.controller"));
app.use("/userCourses", require("./userCourses/userCourses.controller"));
app.use("/questions", require("./questions/questions.controller"));
app.use("/userCards", require("./userCards/userCards.controller"));
app.use("/friends", require("./friends/friends.controller"));
app.use("/duels", require("./duels/duels.controller"));
app.use("/duelAnswers", require("./duelAnswers/duelAnswers.controller"));

// global error handler
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server listening on port " + PORT));
