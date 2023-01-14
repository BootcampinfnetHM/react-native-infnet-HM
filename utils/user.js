import { getAuth, updateProfile, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { getData, saveImageBase64ToUrl, getFile } from "./storage";

import { authLogin } from "./auth";


const update = async (app, object) => {
    const auth = getAuth(app)
    await updateProfile(auth.currentUser, object )
    console.log(object)
    // onAuthStateChanged((user) => {
         
    // })

    // signInWithCredential(auth, )

}

export { update }