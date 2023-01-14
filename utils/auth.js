import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { storeData, clearStorage, getData } from "./storage"

import AsyncStorage from "@react-native-async-storage/async-storage"


const reauthenticate = async (app) => {
    const user = await getData("user")
    await authLogin(app, user.emailText, user.passwordText)
}


const userIsLoggedIn = async () => {
    return true
}

const authLogin = async (firebaseApp, emailText, passwordText) => {
    try{
        const auth = getAuth(firebaseApp)
        const result = await signInWithEmailAndPassword(auth, emailText, passwordText)
        // console.log(result)

        storeData('user', {
            emailText,
            passwordText,
            // displayName,
            // phoneNumber,    
            // photoUrl,
            // uid
        }) 
        }
        catch(err){
            console.log(err)
        }
}

const authRegister = async (firebaseApp, emailText, passwordText) => {
    const auth = getAuth(firebaseApp)

    try{
        const result = await createUserWithEmailAndPassword(auth, emailText, passwordText)

        storeData('user', {
            emailText,
            // phoneNumber,
            // photoUrl,
            // uid,
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