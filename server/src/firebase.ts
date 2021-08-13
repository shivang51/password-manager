import { sign } from "crypto";
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(
    (__dirname + process.env.FIREBASE_ADMIN_KEY) as string
  ),
});

const db: FirebaseFirestore.Firestore = admin.firestore();
const auth: admin.auth.Auth = admin.auth();

export function getallentries(): Promise<FirebaseFirestore.DocumentData[]> {
  return new Promise((resolve) => {
    let entries: FirebaseFirestore.DocumentData[] = [];
    db.collection("entries")
      .get()
      .then((ref) => {
        ref.docs.forEach((doc, ind) => {
          entries.push(doc.data());
          if (ref.docs.length == entries.length) {
            resolve(entries);
          }
        });
      });
  });
}

export function signup(email: string, password: string) {
  return auth.createUser({ email: email, password: password });
}

signup("my.dev.acc.051@gmail.com", "123456")
  .then((e) => {})
  .catch((err) => {
    console.log(err.errorInfo);
  });
