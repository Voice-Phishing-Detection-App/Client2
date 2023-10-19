import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import messaging from '@react-native-firebase/messaging';
import SInfo from 'react-native-sensitive-info';
import {url} from '../url';
import CallScreen from '../test/Call.js';
import {useEffect, useState} from 'react';
import {Vibration} from 'react-native';
import CallStateScreen from '../test/CallStateScreen';
const RootStack = createStackNavigator();

const Navigation = () => {
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);

      if (remoteMessage.data.call === 'incoming') {
        console.log('call', remoteMessage.data);
        fcmget();
        setIncomingCall({callerName: remoteMessage.data.callerName});
        Vibration.vibrate([1000, 500, 1000]);
      }
    });
    return unsubscribe;
  }, []);

  if (incomingCall) {
    return (
      <CallScreen
        callerName={incomingCall.callerName}
        onAccept={() => {}}
        onReject={() => {}}
      />
    );
  }

  const fcmget = async () => {
    const token = await messaging().getToken();
    await fetch(`${url}/twilio/token`, {
      method: 'POST',
      body: JSON.stringify({
        fcmToken: token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('성공', data);
        SInfo.setItem('TwilioToken', data.twilioToken, {});
      })
      .catch(error => {
        console.error('실패', error);
      });
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="c"
        screenOptions={{headerShown: false}}>
        {/* <RootStack.Screen name="Auth" component={AuthStack} />
        <RootStack.Screen name="Main" component={MainStack} /> */}
        <RootStack.Screen name="c" component={CallStateScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
