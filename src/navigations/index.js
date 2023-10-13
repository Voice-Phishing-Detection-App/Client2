import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import SInfo from 'react-native-sensitive-info';
import {url} from '../url';
import SInfo from 'react-native-sensitive-info';

const RootStack = createStackNavigator();

const Navigation = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('foreground: ', remoteMessage);
    const call = remoteMessage.data.call;
    if (call == 'incoming') {
      fcmget();
    }
  });

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
        initialRouteName="Auth"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Auth" component={AuthStack} />
        <RootStack.Screen name="Main" component={MainStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
