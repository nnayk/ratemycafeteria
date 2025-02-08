import { getFirestore, setDoc, getDocs, doc, addDoc, collection, getDoc } 
from "firebase/firestore";
import {app, SCHOOLS} from './constants';
import { User } from "firebase/auth";
import { uploadPhotos } from './backend';
//import { v2 as cloudinary } from 'cloudinary';
import { log } from "./utils/logger"; 
// Initialize Cloud Firestore and get a reference to the service 

const db = getFirestore(app); // TODO: change this to prod db when it's created

export interface Cafeteria {
    name: string;
    imageUrl: string;
}

export interface Review {
    user: User | null;
    quality: number;
    quantity: number;
    pricing: number;
    date: string;
    details: string;
    likes: number;
    dislikes: number;
    photos: string[] | File[];
}
  
export interface SchoolDetails {
    name: string;
    cafeterias: Cafeteria[];
}

export interface CafeDetails {
    name: string;
    reviews: Review[];
}

export function getDb() {
    log(`db's app = ${db.app.name}`)
    return db;
}

export async function getSchools() { // THis will be a future utility when we have a dynamic list of schools
   log(`inside getSchools`);
   const querySnap = await getDocs(collection(db,"schools"));
   const schools = querySnap.docs.map(doc => doc.data());
   log(`schools=${schools}`);
   return schools;
}

export async function getCafeterias(school : string) {
    log("inside getCafeterias");
    log(`school=${school}`);
    const querySnap = await getDocs(collection(db, "reviews"));
    const cafeterias = querySnap.docs.map(doc => doc.data());
    log(`cafeterias=${cafeterias}`);
    return cafeterias;
}

export async function getSchoolDetails(school : string) {
    log("inside getSchoolDetails");
    // fetch cafeterias for the school
    const cafeterias = await getCafeterias(school);
    return {
        name: school,
        // cafeterias: cafeterias,
        cafeterias: [
            { name: "cafeteria1jksadflhiudjsgdshfdukajslhsfhljlhjkadsflhjakdahkkhDKHADHkdjs", imageUrl: "/einsteins.png" },
            { name: "Subway", imageUrl: "/subway.jpg" },
            { name: "Panda Express", imageUrl: "/raw.png" },
            { name: "VG", imageUrl: "/vg.jpg" },
            { name: "Vista Grande", imageUrl: "https://via.placeholder.com/150" },
        ],
    };
} 

export async function requestSchool(user : User|null, name : string, cafe : string) {
    try {
        log(`user=${user}`)
        await addDoc(collection(db, "school_requests"), {
            name: name,
            user: user ? user.uid : null,
            cafe: cafe 
        })
    } catch (e) {
        log("Error adding document: ", e);
    }
}

export async function requestCafe(user : User|null, school : string, cafe : string) {
    try {
        log(`user=${user},school=${school},cafe=${cafe}`);
		const schoolSnap = await getDoc(doc(db, "cafe_requests", school)); // Document for the school
        if(!schoolSnap.exists()) {
            log(`Creating document for ${school}`);
            await setDoc(doc(db, "cafe_requests", school), {
            });
        }
    const schoolRef = doc(db, "cafe_requests", school);
	const cafesRef = collection(schoolRef, "cafes"); // Subcollection for cafes
	await setDoc(doc(cafesRef, cafe), {
		user: user ? user.uid : null,
		cafe: cafe,
	});
	} catch (e) {
        log("Error adding document: ", e);
    }
}

export async function schoolNameToId(name : string) {
    return name.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-").toLowerCase();
}

// for now will manually approve and add schools but this will be a future utility
// export async function addSchool(name : string,city : string,state : string) {
//     try {
//         const docId = `${name}-${city}-${state}`
//         await setDoc(doc(db, "schools", docId), {    
//             name: name,
//             city: city,
//             state: state,
//             review_count: 0,
//         });
//         log("Document written with ID: ", docId);
//     } catch (e) {
//         log("Error adding document: ", e);
//     }
// }
//

export async function addReview(school : string, cafe : string, reviewData : Review ) {
    try {
        log(`school=${school},cafe=${cafe}, reviewData=${reviewData}`);
        // if this is the first review for the school, create a document for the school
        // create the school doc
        log(`Checking if document exists for ${school}`);
        const reviewDoc = await getDoc(doc(db, "reviews", school));
        if(!reviewDoc.exists()) {
            log(`Creating document for ${school}`);
            await setDoc(doc(db, "reviews", school), {
            });
        } else {
            log(`Document exists for ${school}`);
        }
        const reviewRef = doc(db, "reviews",school);
        log(`reviewRef=${reviewRef}`);
        const cafeRef = collection(reviewRef, cafe);
        //const cafeReviewRef = doc(cafeRef, "reviews");
        const { user, quality, quantity, pricing, details, date, photos } = reviewData;
        log(`Adding review for ${school}/${cafe}`);
        // for (const photo of photos) {
        //     log(photo.name);
        // }
        const photo_urls =  await uploadPhotos(photos, school, cafe);
        // store the photo urls returned in the response in a var photo_urls
        const docRef = await addDoc(cafeRef, {
                        user: user ? user.uid : null,
                        quality: quality,
                        quantity: quantity,
                        pricing: pricing,
                        date: date,
                        details: details,
                        photo_urls: photo_urls,
            //timestamp: new Date(),
        });
        log("Document written with ID: ", docRef.id);
        log("Number of photos: ", photos.length);
        //await uploadPhotos(photos, school, cafe, docRef.id);
    } catch (e) {
        log("Error adding document: ", e);
        // TODO: redirect to server error page
    }
}

export async function getReviews(school: string, cafe: string): Promise<Review[]> {
  const db = getDb();
  log(`db = ${db.app.name}`);
  // school = "Cal Poly San Luis Obispo";
  // cafe = "Panda Express";
  log(`Getting reviews for ${school}/${cafe}`);
  const querySnap = await getDocs(collection(db, "reviews", school, cafe));
  log(`Got ${querySnap.docs.length} reviews for ${school}/${cafe}`);
  
  const reviews: Review[] = querySnap.docs.map(doc => {
    const data = doc.data();
    return {
      user: data.user || null,
      quality: data.quality || 0,
      quantity: data.quantity || 0,
      pricing: data.pricing || 0,
      date: data.date || '',
      details: data.details || '',
      likes: data.likes || 0,
      dislikes: data.dislikes || 0,
      photos: data.photo_urls || [],
    };
  });
  
  log(`Got ${reviews.length} reviews for ${school}/${cafe}`);
  log(reviews);
  return reviews;
}

/*
export async function uploadPhotos(photos: File[], school: string, cafe: string, reviewId: string) {
    return;
    // Upload an image
    for (const photo of photos) {
        const uploadResult = await cloudinary.uploader
            .upload(photo, {
                public_id: `${school}/${cafe}/${reviewId}/${photo.name}`,
            })
            .catch((error) => {
                log(error);
            });
        log(uploadResult);
    }
}
*/
