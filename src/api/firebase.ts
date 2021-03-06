import * as admin from "firebase-admin";
import * as db from "../model";
import type { UserIdentifier } from "./user";

admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_CERT || ""),
    databaseURL: process.env.FIREBASE_DB || ""
});

export async function updateListener(deviceToken: string, users: UserIdentifier[], themeIDs: number[]): Promise<void> {
    await db.FCMListener.updateOne({ deviceToken },
        { users, themeIDs }, { upsert: true });
}

export async function sendUserNotification({ userProvider, userID }: UserIdentifier, title: string, body: string): Promise<void> {
    const listeners = await db.FCMListener.find({
        users: { $elemMatch: { userProvider, userID } }
    }).exec();
    if (listeners.length == 0) { return; }

    await admin.messaging().sendMulticast({
        notification: { title, body },
        tokens: listeners.map(listener => listener.deviceToken)
    });
}

export async function sendThemeNotification(themeID: number, title: string, body: string): Promise<void> {
    const listeners = await db.FCMListener.find({ themeIDs: { $in: [themeID] } }).exec();
    if (listeners.length == 0) { return; }

    await admin.messaging().sendMulticast({
        notification: { title, body },
        tokens: listeners.map(listener => listener.deviceToken)
    });
}
