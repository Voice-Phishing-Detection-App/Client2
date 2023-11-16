/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {url} from './src/url';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('background: ', remoteMessage);
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
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('성공', data);
    })
    .catch(error => {
      console.error('실패', error);
    });
};

AppRegistry.registerComponent(appName, () => App);
