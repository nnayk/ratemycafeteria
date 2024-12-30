import { getFirestore, setDoc, doc  } from "firebase/firestore";
import {app} from './constants';
import { User } from "firebase/auth";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export function getDb() {
    console.log(`db's app = ${db.app.name}`)
    return db;
}

export async function requestSchool(user : User, name : string,city : string,state : string) {
    try {
        const docId = `${name}-${city}-${state}`
        console.log(`user=${user}, id = ${user.uid}`)
        await setDoc(doc(db, "school_requests", docId), {    
            name: name,
            city: city,
            state: state,
            user: user.uid, 
        });
        console.log("Document written with ID: ", docId);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
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