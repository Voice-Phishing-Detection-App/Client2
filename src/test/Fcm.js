import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});

const Fcm = () => {
  const [fcmToken, setFcmToken] = useState('');

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('[FCM Token]', token);
    setFcmToken(token);
  };

  const FcmToken = async () => {
    try {
      const url = 'YOUR_SERVER_URL';

      const response = await axios.post(url, {
        fcmToken: fcmToken,
      });

      console.log('성공:', response.data);
    } catch (error) {
      console.error('오류:', error);
    }
  };

  useEffect(() => {
    getFcmToken();
  }, []);

  return (
    <View>
      <Text>Test</Text>
      <Button title="Send Token to Server" onPress={FcmToken} />
    </View>
  );
};

export default Fcm;
