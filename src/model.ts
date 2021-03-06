import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export interface ThemeModel extends mongoose.Document {
    isEnabled: boolean,
    themeID: number,
    userProvider: string,
    userID: string,
    title: string,
    description: string,
    imageURI: string,
    genre: number,
    choices: string[],
    keywords: string[],
    DRClass: number,
    isPersonalMatters: boolean
};

export interface UserModel extends mongoose.Document {
    name: string,
    userProvider: string,
    userID: string,
    friends: string[],
    imageURI: string,
    numOfFollowers: number
};

export interface SessionModel extends mongoose.Document {
    userProvider: string,
    userID: string,
    sessionID: string,
    sessionIDExpire: number,
    sessionToken: string,
    sessionTokenExpire: number
};

export interface VoteModel extends mongoose.Document {
    themeID: number,
    answer: number,
    userProvider: string,
    userID: string,
    createdAt: number,
    expiredAt: number
};

export interface CommentModel extends mongoose.Document {
    themeID: number,
    message: string,
    userProvider: string,
    userID: string,
    createdAt: number,
};

export interface FeedbackModel extends mongoose.Document {
    message: string,
    feedbackType: string
};

export interface FCMListenerModel extends mongoose.Document {
    deviceToken: string,
    users: {
        userProvider: string,
        userID: string
    }[],
    themeIDs: number[]
};

const ThemeSchema = new mongoose.Schema<ThemeModel>({
    isEnabled: Boolean,
    themeID: Number,
    userProvider: String,
    userID: String,
    title: String,
    description: String,
    imageURI: String,
    genre: Number,
    choices: [String],
    keywords: [String],
    DRClass: Number,
    isPersonalMatters: Boolean
});

const UserSchema = new mongoose.Schema<UserModel>({
    name: String,
    userProvider: String,
    userID: String,
    friends: [String],
    imageURI: String,
    numOfFollowers: Number
});

const SessionSchema = new mongoose.Schema<SessionModel>({
    userProvider: String,
    userID: String,
    sessionID: String,
    sessionIDExpire: Number,
    sessionToken: String,
    sessionTokenExpire: Number
});

const VoteSchema = new mongoose.Schema<VoteModel>({
    themeID: Number,
    answer: Number,
    userProvider: String,
    userID: String,
    createdAt: Number,
    expiredAt: Number
});

const CommentSchema = new mongoose.Schema<CommentModel>({
    themeID: Number,
    message: String,
    userProvider: String,
    userID: String,
    createdAt: Number,
});

const FeedbackSchema = new mongoose.Schema<FeedbackModel>({
    message: String,
    feedbackType: String
});

const FCMListenerSchema = new mongoose.Schema<FCMListenerModel>({
    deviceToken: String,
    users: [{
        userProvider: String,
        userID: String
    }],
    themeIDs: [Number]
});

export const Theme = mongoose.model<ThemeModel>("Theme", ThemeSchema, "themes");
export const User = mongoose.model<UserModel>("User", UserSchema, "users");
export const Session = mongoose.model<SessionModel>("Session", SessionSchema, "sessions");
export const Vote = mongoose.model<VoteModel>("Vote", VoteSchema, "votes");
export const Comment = mongoose.model<CommentModel>("Comment", CommentSchema, "comments");
export const Feedback = mongoose.model<FeedbackModel>("Feedback", FeedbackSchema, "feedbacks");
export const FCMListener = mongoose.model<FCMListenerModel>("FCMListener", FCMListenerSchema, "fcmlisteners");
