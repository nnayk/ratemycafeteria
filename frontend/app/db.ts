import { getFirestore, setDoc, getDocs, doc, addDoc, collection  } from "firebase/firestore";
import {app, SCHOOLS} from './constants';
import { User } from "firebase/auth";
import { v2 as cloudinary } from 'cloudinary';
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export interface Cafeteria {
    name: string;
    imageUrl: string;
  }
  
export interface SchoolDetails {
    name: string;
    cafeterias: Cafeteria[];
}

export function getDb() {
    console.log(`db's app = ${db.app.name}`)
    return db;
}

export async function getSchools() {
 // THis will be a future utility when we have a dynamic list of schools
//    const querySnap = await getDocs(collection(db,"schools"));
//    const schools = querySnap.docs.map(doc => doc.data());
//    return schools;
 return SCHOOLS;
}

export async function getSchoolDetails(school : string) {
    return {
        name: school,
        cafeterias: [
            { name: "cafeteria1jksadflhiudjsgdshfdukajslhsfhljlhjkadsflhjakdahkkhDKHADHkdjs", imageUrl: "/einsteins.png" },
            { name: "Subway", imageUrl: "/subway.jpg" },
            { name: "Panda Express", imageUrl: "/raw.png" },
            { name: "VG", imageUrl: "/vg.jpg" },
            { name: "Vista Grande", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria6", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria1", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria1", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria1", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria2", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria3", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria4", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria5", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria6", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria2", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria3", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria4", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria5", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria6", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria2", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria3", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria4", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria5", imageUrl: "https://via.placeholder.com/150" },
            // { name: "cafeteria6", imageUrl: "https://via.placeholder.com/150" },
        ],
    };
} 

export async function requestSchool(user : User|null, name : string, cafe : string) {
    try {
        console.log(`user=${user}`)
        await addDoc(collection(db, "school_requests"), {
            name: name,
            user: user ? user.uid : null,
            cafe: cafe 
        })
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function requestCafe(user : User|null, school : string, cafe : string) {
    try {
        console.log(`user=${user},school=${school},cafe=${cafe}`);
		const schoolRef = doc(db, "cafe_requests", school); // Document for the school
	const cafesRef = collection(schoolRef, "cafes"); // Subcollection for cafes
	await setDoc(doc(cafesRef, cafe), {
		user: user ? user.uid : null,
		cafe: cafe,
	});
	} catch (e) {
        console.error("Error adding document: ", e);
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
//         console.log("Document written with ID: ", docId);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }
//

export async function addReview(school : string, cafe : string, user : User, quality : number, quantity : number, pricing : number, details : string, photos: File[]) {
    try {
        const reviewRef = doc(db, "reviews",school);
        const cafeRef = collection(reviewRef, cafe);
        //const cafeReviewRef = doc(cafeRef, "reviews");
        const docRef = await addDoc(cafeRef, {
                        user: user ? user.uid : null,
                        quality: quality,
                        quantity: quantity,
                        pricing: pricing,
                        details: details,
            //timestamp: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
        console.log("Number of photos: ", photos.length);
        for (const photo of photos) {
            console.log(photo.name);
        }
        //await uploadPhotos(photos, school, cafe, docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function uploadPhotos(photos: File[], school: string, cafe: string, reviewId: string) {
    return;
    // Upload an image
    for (const photo of photos) {
        const uploadResult = await cloudinary.uploader
            .upload(photo, {
                public_id: `${school}/${cafe}/${reviewId}/${photo.name}`,
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(uploadResult);
    }
}
