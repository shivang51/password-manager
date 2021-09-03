import admin from "firebase-admin";
import * as firebaseElements from "./firbaseElements";
import { sendOtp } from "./email";
import { env_variables } from "./globals";

const username: string = "my.dev.acc.051@gmail.com";

admin.initializeApp({
  credential: admin.credential.cert(
    (__dirname + env_variables.FIREBASE_ADMIN_KEY) as string
  ),
});

const db: FirebaseFirestore.Firestore = admin.firestore();

/**
 *Get the document from the given collection
 * @param collectionName Name of the collection from which document is required
 * @param docId ID of required document
 * @returns Document data if document exist else `false`
 */
function getDocument(
  collectionName: string,
  docId: string
): Promise<firebaseElements.IGDPromise | boolean> {
  return new Promise(async (resolve) => {
    let status: boolean = await checkExist(collectionName, docId);
    if (status) {
      const data: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
        await db
          .collection(collectionName)
          .where(admin.firestore.FieldPath.documentId(), "==", docId)
          .get();
      resolve({ docData: data.docs[0].data() });
    } else {
      resolve(false);
    }
  });
}

/**
 *
 * @param id Gmail id of the user
 * @param otp Otp entered by the user
 * @returns 0 if otp is a match
 * @returns 1 if otp is not a match
 * @returns -1 if User does not exist
 */
export function verifyOtp(id: string, otp: string): Promise<number> {
  return new Promise(async (resolve) => {
    let data: firebaseElements.IGDPromise | boolean = await getDocument(
      "tempUsers",
      id
    );
    if (data) {
      data = data as { docData: firebaseElements.Isignupdata };
      if (data.docData.uid === otp) {
        resolve(0);
      } else {
        resolve(1);
      }
    } else {
      resolve(-1);
    }
  });
}

/**
 * Checks if a document in the collection.
 * @param collectionName Name of the collection to check for the document in firestore.
 * @param id ID of the document.
 * @returns `true` if the document exsist else `false`
 */
function checkExist(collectionName: string, id: string): Promise<boolean> {
  return new Promise((resolve) => {
    db.collection(collectionName)
      .where(admin.firestore.FieldPath.documentId(), "==", id)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
  });
}

/**
 * Create user in tempUsers collection in firestore.
 * @param email Email or Gmail of the user
 * @param password Password of the user
 * @returns An object with `created` attribute which is `true` if user was created else `false` and an `otp` attribute which contains the generated otp.
 */
function createUser(
  email: string,
  password: string
): Promise<firebaseElements.ICUPromise> {
  const otp: string = firebaseElements.generateOTP();

  const data: firebaseElements.Isignupdata = {
    email: email,
    password: password,
    uid: firebaseElements.generateOTP(),
  };

  return new Promise((resolve) => {
    db.collection("tempUsers")
      .doc(email)
      .set(data)
      .then((e) => resolve({ created: true, otp: otp }));
  });
}

export function signup(email: string, password: string): Promise<string> {
  return new Promise(async (resolve) => {
    let status: boolean = await checkExist("users", email);
    status = !status ? await checkExist("tempUsers", email) : status;
    if (!status) {
      createUser(email, password)
        .then((value) => {
          sendOtp(email, value.otp);
          resolve("User Created");
        })
        .catch((err) => {
          resolve("Failed to create user");
        });
    } else {
      resolve("User Already Exist");
    }
  });
}

// signup("test1@gmail.com", "123456").then((v) => {
//   console.log(v);
// });
