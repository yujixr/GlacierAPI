import createError from "http-errors";
import express from "express";
import path from "path";
import logger from "morgan";

import helmet from "helmet";
import cors from "cors";
import redis from "redis";
import RedisStore from "connect-redis";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

import indexRouter from "./routes/index";
import themeRouter from "./routes/theme";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import voteRouter from "./routes/vote";
import appRouter from "./routes/app";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(helmet());
app.use(cors({ origin: true }));
app.options("*", cors({ origin: true }));

app.use(session({
    name: "sessionid",
    secret: process.env.SESSION_SECRET || "",
    store: new (RedisStore(session))({
        client: redis.createClient({
            url: process.env.REDIS_URI || ""
        })
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: "auto",
        sameSite: "lax"
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/theme", themeRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/vote", voteRouter);
app.use("/app", appRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, _next: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

export default app;
