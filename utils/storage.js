import AsyncStorage from "@react-native-async-storage/async-storage"

const storageData = async (key, value) =>  {
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
    storageData,
    getData,
    clearStorage,
}