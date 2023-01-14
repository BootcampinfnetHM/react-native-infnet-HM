import AsyncStorage from "@react-native-async-storage/async-storage"

// import {
//     getStorage,
//     ref,
//     uploadString,
//     getDownloadURL
// } from '@firebase-storage'

const saveImageBase64ToUrl = async (app, prefix, imageB64) => {
    const fileName = `${prefix}`
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)

    await uploadString(storageRef, imageB64, 'perfil' )
    return fileName
}

const getFile = async (app, image) => {

}

const storeData = async (key, value) =>  {



    try {
        const valorJson = JSON.stringify(value)
        await AsyncStorage.setItem(key, valorJson)
    }
    catch(err) {

    }
}

const getData = async (key) => {
    try {
        const txtJson = await AsyncStorage.getItem(key)
        const jsonParsed = JSON.parse(txtJson)
        return jsonParsed
    }
    catch(err) {

    }
}

const clearStorage = async () => {
    AsyncStorage.clear()
}

export {
    storeData,
    getData,
    clearStorage,
    saveImageBase64ToUrl,
    getFile
}