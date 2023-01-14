import { getData } from "../utils/storage"
import { update } from "../utils/user"
import { TextInput, IconButton, Button, Stack, Avatar, Snackbar, FAB, } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native-web";
import { useState, useEffect } from 'react';
import { PickImage } from "../utils/image";


const Profile = ({route}) => {
    const [emailText, setEmail] = useState('')
    const [displayName, setDisplayName] = useState([])
    const [phoneNumber, setPhoneNumber] = useState([])
    const [photoUrl, setPhotoUrl] = useState('')
    const [snackBarckShow, setSnackBarShow] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const dadosAtuais = async () => {
        let user = await getData("user")
        setEmail(user.emailText)
        setDisplayName(user.displayName)
        setPhoneNumber(user.phoneNumber)
    }

    const uploadPhoto = async () => {
        const image = await PickImage()
        setPhotoUrl(image)
    }

    useEffect(() => {
        dadosAtuais()
    })

    return (
        <View
        style={{
            alignSekf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: '20px'
        }}
        >
            <View>
                <Avatar
                style={{margin: 'auto'}} 
                size={120}
                image={{ uri: photoUrl ? photoUrl : '' }}
                />

                <FAB
                color='primary'
                style={{width: '55px', position: 'absolute', bottom: 0, right:0 }}
                onPress={uploadPhoto}
                icon={(props) => <Icon name="camera" {...props}/>}
                >
                </FAB>
            </View>

            <TextInput
            style={{marginTop: '20px'}}
            label="E-mail"
            variant="outlined"
            leading={props => <Icon name="email" {...props} />}
            value={emailText}
            onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
            label="Nome"
            variant="outlined"
            leading={props => <Icon name="account" {...props} />}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            />
            <TextInput
            label="Telefone"
            variant="outlined"
            leading={props => <Icon name="phone" {...props} />}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            />

<Button
        title="Editar Perfil"
        onPress={
            async () => {  
                setLoading(true)
                await update(route.params.firebaseApp, {
                    emailText,
                    displayName,
                    phoneNumber,
                    photoUrl
                }) 
                setLoading(false)
                setSnackBarShow(true)     
            }
        }
        leading={(props) => <Icon name="pencil" {...props} />}
        loading={loading}
        style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            width: '100%',
            textAlign: 'center'
        }}
        />
        
       <>
        {
            snackBarckShow ? 
            (<Snackbar
                  message="Usuário alterado com sucesso"
                  action={<Button title="Fechar" onPress={() => setSnackBarShow(false)} />}
                  style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
            />)
            :
            ("")
        }</>
            
        </View>
    )
}

export default Profile