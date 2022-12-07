import { View, Text } from "react-native"

import { TextInput, IconButton, Button, Stack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-web";
import { authLogin } from "../utils/auth";


const Login = ({navigation, route}) => {
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
            variant="outlined"
            leading={props => <Icon name="account" {...props} />}
            value={emailText}
            onChange={(e) => setEmail(e.target.value)}
            />
           <TextInput
            label="Senha"
            variant="outlined"
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
        title="Entrar"
        onPress={
            async () => {
                if(emailText !== "" && passwordText !== "") {
                    try{
                        const result = await authLogin(route.params.firebaseApp, emailText, passwordText)
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
        onPress={() => navigation.navigate('Register')}
        style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            width: '100%',
            textAlign: 'center'
        }}
        >
            <Text>REGISTRAR</Text>
        </TouchableOpacity>

        </Stack>
    )
}

export default Login