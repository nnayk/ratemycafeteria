import { getFirestore, setDoc, doc, addDoc, collection  } from "firebase/firestore";
import {app} from './constants';
import { User } from "firebase/auth";

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
    return ["school1", "school2", "school3"];
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
        console.log(`user=${user}`)
        await addDoc(collection(db, "cafe_requests"), {
            school: school,
            user: user ? user.uid : null,
            cafe: cafe 
        })
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
