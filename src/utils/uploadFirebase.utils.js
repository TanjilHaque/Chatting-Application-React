//uploadFirebase.utils.js
import { getDatabase, push, ref, set } from "firebase/database";
// Make sure you are exporting 'db' from your Firebase.config.js


const db = getDatabase();

export const uploadFirebaseData = async (pathOrRef = "", data = {}) => { // Renamed dbName to pathOrRef for clarity
    try {
        let targetRef;
        if (typeof pathOrRef === 'string') {
            // If it's a string, create a new ref
            targetRef = ref(db, pathOrRef.trim());
        } else if (pathOrRef && typeof pathOrRef.key === 'string' && pathOrRef.parent) {
            // If it's already a Firebase ref object (like from ref(db, "Grouplist/")), use it
            targetRef = pathOrRef;
        } else {
            throw new Error("Invalid pathOrRef provided to uploadFirebaseData. Must be a string path or a Firebase Ref.");
        }

        const pushedRef = push(targetRef); // Use push on the targetRef
        await set(pushedRef, data);
        console.log("Firebase upload successful:", pushedRef.key);
        return pushedRef; // Return the reference including the key
    } catch (error) {
        console.error(`Firebase set method Error: ${error}`);
        throw new Error(`Firebase set method Error: ${error.message}`);
    }
};