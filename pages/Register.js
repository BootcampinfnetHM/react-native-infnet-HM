import { View, Text } from "react-native"

import { TextInput, IconButton, Button, Stack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-web";

import { authRegister } from "../utils/auth";

const Register = ({navigation, route}) => {
    const [hidePassword, setShowPassword] = useState(true)
    const [emailText, setEmail] = useState('')
    const [passwordText, setPassword] = useState('')


    return (
        <Stack
        direction="column"
        style={{
            justifyContent: 'center',
            height: '100%',
            padding: '10px'
        }}
        >
            <TextInput
            label="E-mail"
            leading={props => <Icon name="account" {...props} />}
            value={emailText}
            onChange={(e) => setEmail(e.target.value)}
            />
           <TextInput
            label="Senha"
            leading={props => <Icon name="lock" {...props}/>}
            secureTextEntry={hidePassword}
            onChange={(e) => setPassword(e.target.value)}
            trailing={props => (
                <IconButton
                icon={props => <Icon 
                name={hidePassword ? "eye" : "eye-off"} {...props} />} {...props}
                onPress={() => setShowPassword(!hidePassword)}
                />
              )}
              value={passwordText}
            />
        <Button
        title="Registrar"
        onPress={
            async () => {
                if(emailText !== "" && passwordText !== "") {
                    try{
                        const result = await authRegister(route.params.firebaseApp, emailText, passwordText)
                        route.params.setIsLoggedIn(true)

                    }
                    catch(err) {
                        console.log(err)
                        alert('Dados inválidos')
                    }
                }
                else {
                    alert('Todos os campos devem ser preenchidos')
                }
            }
        }
        leading={(props) => <Icon name="send" {...props} />}
        style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            width: '100%',
            textAlign: 'center'

        }}
        />
        <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            width: '100%',
            textAlign: 'center'
        }}
        >
            <Text>ENTRAR</Text>
        </TouchableOpacity>

        </Stack>
    )
}

export default Register