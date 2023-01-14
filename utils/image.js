import * as ImagePicker from "expo-image-picker"

const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    })


    if (!result.cancelled) {
        return result.uri
    }
    return null

}

export { PickImage }

