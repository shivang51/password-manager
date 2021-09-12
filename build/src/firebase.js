"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.verifyOtp = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebaseElements = __importStar(require("./firbaseElements"));
const email_1 = require("./email");
const globals_1 = require("./globals");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        projectId: globals_1.env_variables.FIREBASE_PROJECT_ID,
        privateKey: globals_1.env_variables.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: globals_1.env_variables.FIREBASE_CLIENT_EMAIL,
    }),
});
const db = firebase_admin_1.default.firestore();
/**
 *Get the document from the given collection
 * @param collectionName Name of the collection from which document is required
 * @param docId ID of required document
 * @returns Document data if document exist else `false`
 */
function getDocument(collectionName, docId) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let status = yield checkExist(collectionName, docId);
        if (status) {
            const data = yield db
                .collection(collectionName)
                .where(firebase_admin_1.default.firestore.FieldPath.documentId(), "==", docId)
                .get();
            resolve({ docData: data.docs[0].data() });
        }
        else {
            resolve(false);
        }
    }));
}
/**
 *
 * @param id Gmail id of the user
 * @param otp Otp entered by the user
 * @returns 0 if otp is a match
 * @returns 1 if otp is not a match
 * @returns -1 if User does not exist
 */
function verifyOtp(id, otp) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let data = yield getDocument("tempUsers", id);
        if (data) {
            data = data;
            if (data.docData.uid === otp) {
                resolve(0);
            }
            else {
                resolve(1);
            }
        }
        else {
            resolve(-1);
        }
    }));
}
exports.verifyOtp = verifyOtp;
/**
 * Checks if a document in the collection.
 * @param collectionName Name of the collection to check for the document in firestore.
 * @param id ID of the document.
 * @returns `true` if the document exsist else `false`
 */
function checkExist(collectionName, id) {
    return new Promise((resolve) => {
        db.collection(collectionName)
            .where(firebase_admin_1.default.firestore.FieldPath.documentId(), "==", id)
            .get()
            .then((snapshot) => {
            if (snapshot.empty) {
                resolve(false);
            }
            else {
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
function createUser(email, password) {
    const otp = firebaseElements.generateOTP();
    const data = {
        email: email,
        password: password,
        uid: otp,
    };
    return new Promise((resolve) => {
        db.collection("tempUsers")
            .doc(email)
            .set(data)
            .then((e) => resolve({ created: true, otp: otp }));
    });
}
/**
 * Signup new user
 * @param email Email of the user
 * @param password Password of the user
 * @returns 0 if user creation was successfull
 * @returns 1 if user creation failed
 * @returns -1 if user already exist
 * @reutrns -2 if user was created but failed to send the OTP
 */
function signup(email, password) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let status = yield checkExist("users", email);
        if (!status) {
            createUser(email, password)
                .then((value) => {
                email_1.sendOtp(email, value.otp)
                    .then((optRes) => {
                    if (optRes < 0) {
                        resolve(-2);
                    }
                    else {
                        resolve(0);
                    }
                })
                    .catch((err) => {
                    resolve(1);
                });
            })
                .catch((err) => {
                resolve(1);
            });
        }
        else {
            resolve(-1);
        }
    }));
}
exports.signup = signup;
