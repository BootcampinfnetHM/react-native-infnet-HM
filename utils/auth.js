import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { storageData, clearStorage, getData } from "./storage"


const reauthenticate = async (app) => {
    const user = await getData("user")
    await authLogin(app, user.emailText, user.passwordText)
}


const userIsLoggedIn = async () => {
    return true
}

const authLogin = async (firebaseApp, emailText, passwordText) => {
    const auth = getAuth(firebaseApp)

    try{
        const result = await signInWithEmailAndPassword(auth, emailText, passwordText)

        storageData('user', {
            emailText,
            passwordText,
            // displayName,
            // phoneNumber,
            // photoUrl,
            // uid
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
            email,
            phoneNumber,
            photoUrl,
            uid,
            passwordText,
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
    reauthenticate,
    userIsLoggedIn,
    authLogin,
    authRegister,
    authLogout,
}