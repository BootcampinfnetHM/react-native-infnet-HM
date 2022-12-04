import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { storageData, clearStorage } from "./storage"
const userIsLoggedIn = async () => {
    return true
}

const authLogin = async (firebaseApp, emailText, passwordText) => {
    const auth = getAuth(firebaseApp)

    try{
        const result = await signInWithEmailAndPassword(auth, emailText, passwordText)

        storageData('user', {
            displayName: result.user.displayName ,
            email: result.user.email,
            phoneNumber: result.user.phoneNumber,
            photoUrl: result.user.photoUrl,
            uid: result.user.uid,
        })
        }
        catch(err){
            throw err
        }
}

const authRegister = async (firebaseApp, emailText, passwordText) => {
    const auth = getAuth(firebaseApp)

    try{
        const result = await createUserWithEmailAndPassword(auth, emailText, passwordText)

        storageData('user', {
            displayName: result.user.displayName ,
            email: result.user.email,
            phoneNumber: result.user.phoneNumber,
            photoUrl: result.user.photoUrl,
            uid: result.user.uid,
        })

        console.log(result)
    }
    catch(err){
        throw err

    }
    
}

const authLogout = async (emailText, passwordText) => {
    clearStorage()
}

export {
    userIsLoggedIn,
    authLogin,
    authRegister,
    authLogout,
}