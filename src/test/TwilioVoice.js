import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Call, CallInvite} from '@twilio/voice-react-native-sdk';
import SInfo from 'react-native-sensitive-info';
import messaging from '@react-native-firebase/messaging';
import {url} from '../url';

const TwilioVoice = () => {
  const [currentCall, setCurrentCall] = useState(null); // 현재 전화 객체
  const [callerNumber, setCallerNumber] = useState(''); // 전화 건 사람의 번호
  const [fcmToken, setFcmToken] = useState('');

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    setFcmToken(token);
  };

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
        SInfo.setItem('TwilioToken', data.twilioToken, {});
      })
      .catch(error => {
        console.error('실패', error);
      });
  };

  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const call = remoteMessage.data.call;
      if (call === 'incoming') {
        fcmget();
        setupTwilio();
      }
    });

    return unsubscribe;
  }, []);

  const getTwilioToken = async () => {
    try {
      const token = await SInfo.getItem('TwilioToken', {});
      return token;
    } catch (error) {
      console.error('twilio token error ' + error);
      throw error;
    }
  };

  const answerCall = () => {
    if (currentCall) {
      currentCall.accept();
    } else {
      console.log('전화중 아님');
    }
  };

  const rejectCall = () => {
    if (currentCall) {
      currentCall.reject();
    } else {
      console.log('전화중 아님');
    }
  };

  const setupTwilio = async () => {
    try {
      const twilioToken = await getTwilioToken();
      const callInvite = new CallInvite(twilioToken);

      callInvite.addEventListener('incoming', incomingCallInvite => {
        setCurrentCall(incomingCallInvite);
        setCallerNumber(incomingCallInvite.from);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Incoming Call</Text>
      <Text>Caller Number: {callerNumber}</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={answerCall}>
          <Text style={{color: 'white'}}>Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={rejectCall}>
          <Text style={{color: 'white'}}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TwilioVoice;
