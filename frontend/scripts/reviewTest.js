import { collection, addDoc, getFirestore, getDoc, doc, getDocs } from "firebase/firestore";
import { app } from "./constants.js";

const db = getFirestore(app);
async function addReview(school, cafe, reviewData) {
  try {
    const reviewsRef = collection(db, "cafes", school, cafe, "reviews");
    await addDoc(reviewsRef, reviewData);
    console.log("Review added!");
  } catch (error) {
    console.error("Error adding review:", error);
  }
}

async function migrateReviewRequest(school,cafe,reqId) {
  try {
    console.log(`Migrating review request: ${reqId}`);
    const cafeRef = collection(db, "cafes", school, cafe);
    // if (!cafeRef) {
    //     await addDoc(cafeRef, {});
    // }
    // const reviewRef = await getDoc(doc(db,"review_requests",school,cafe,reqId));
    const reviewRef = await getDoc(doc(db,"review_requests",school));
    const reviewData = reviewRef.data();
    console.log(`Review data: ${reviewData}`);
    // console.log(`Review request ref: ${reviewRef}`);
    console.log("Review migrated!");
  } catch (error) {
    console.error("Error migrating review:", error);
  }
}

const schools = await getDocs(collection(db, "schools"));
// await migrateReviewRequest("Cal Poly San Luis Obispo","Subway","kQ7OaT4ut5CPBH6uAllw");

