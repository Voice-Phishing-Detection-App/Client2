import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CallInvite, Call, CallState} from '@twilio/voice-react-native-sdk';
import messaging from '@react-native-firebase/messaging';

const TwilioVoice3 = () => {
  const [currentCall, setCurrentCall] = useState(null);
  const [callerNumber, setCallerNumber] = useState('');

  useEffect(() => {
    // 푸시 알림 메시지 처리
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const call = remoteMessage.data.call;
      if (call === 'incoming') {
        // 전화 수락 작업
        acceptCall();
      }
    });

    return unsubscribe;
  }, []);

  const acceptCall = () => {
    // CallInvite로부터 Call을 수락
    if (currentCall) {
      currentCall.accept();
      currentCall.on(Call.Event.Connected, () => {
        // 통화 연결 시 처리
        setCallerNumber(currentCall.from);
      });
      currentCall.on(Call.Event.Disconnected, () => {
        // 통화 종료 시 처리
        setCurrentCall(null);
        setCallerNumber('');
      });
    }
  };

  const rejectCall = () => {
    // CallInvite를 거절
    if (currentCall) {
      currentCall.reject();
      setCurrentCall(null);
      setCallerNumber('');
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
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={acceptCall}>
          <Text style={{color: 'white'}}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            backgroundColor: 'red',
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

export default TwilioVoice3;
