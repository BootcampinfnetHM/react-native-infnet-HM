import { useEffect, useState } from "react"
import { View, Text } from "react-native"

import {Button} from "@react-native-material/core";


const Home = () => {

    const [minute, setMinute] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [startPomodoro, setStartPomodoro] = useState(false)
    

    const stopPomodoro = () => {
            setMinute(25)
            setSeconds(0)
    }


    const initiPomodoro = () => {
        setStartPomodoro(true)
        let countMin = 24
        setMinute(minute - 1)
        let intervalMinute = setInterval(() => {
            setMinute(countMin)
            if (countMin === 0) {
                clearInterval(intervalMinute)
                clearInterval(intervalSeconds)
            }
        }, 1000 * 60)
        
        let countSec = 59
        setSeconds(countSec)
        let intervalSeconds = setInterval(() => {
            --countSec
            setSeconds(countSec)
            if(countSec === 0) {
                setSeconds('00')
                countSec = 59
            }
        }, 1000)
    }

    useEffect(() => {
        
    }, [])

    return (
        <View
        style={{
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: '20px'
        }}>
        
        <Text
        style={{
            fontSize: 55,
            fontWeight: 'bolder',
            marginBottom: '20px'
        }}>
    {`0${minute}`.slice(-2)}:{`0${seconds}`.slice(-2)}
        </Text>
        {
            startPomodoro ? (
                <Button
                title="Parar contagem"
                onPress={() => stopPomodoro()}
                />
            )
            :
            (
                <Button
                title="Iniciar contagem"
                onPress={() => initiPomodoro() }
                />
            )
        }
        </View>
    )
}

export default Home