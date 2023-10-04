import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

const RootStack = createStackNavigator();

const Navigation = () => {
  const [fcmToken, setFcmToken] = useState('');

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    setFcmToken(token);
  };

  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('foreground:', remoteMessage);
      // 여기에서 메시지를 처리하고 화면에 표시할 수 있습니다.
      const call = remoteMessage.data.call;
      if (call == 'incoming') {
        // call: incoming 이라서 이 상태일때 통신 보내는걸로 했음 -> 나중에 다른 표시로 바꿔도 될듯
        fcmget();
      }
      // 추출한 데이터를 로그에 출력 - 원하는 것만 출력
    });

    return unsubscribe;
  }, []);

  const fcmget = async () => {
    await fetch(`${url}/token`, {
      method: 'POST',
      body: {
        fcmToken: fcmToken,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('성공', data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Auth" component={AuthStack} />
        <RootStack.Screen name="Main" component={MainStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
