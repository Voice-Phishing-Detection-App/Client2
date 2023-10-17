import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CallInvite, Call} from '@twilio/voice-react-native-sdk';

const TwilioVoice2 = () => {
  const [callInvite, setCallInvite] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    // CallInvite 이벤트 핸들러를 등록합니다.
    CallInvite.addEventListener('callInvite', handleCallInvite);

    // Call 이벤트 핸들러를 등록합니다.
    Call.addEventListener('callConnect', handleCallConnect);

    return () => {
      // 컴포넌트가 언마운트되면 이벤트 핸들러를 제거합니다.
      CallInvite.removeEventListener('callInvite', handleCallInvite);
      Call.removeEventListener('callConnect', handleCallConnect);
    };
  }, []);

  // CallInvite 이벤트 핸들러
  const handleCallInvite = callInvite => {
    setCallInvite(callInvite);
  };

  // 전화를 수락하는 함수
  const answerCall = () => {
    if (callInvite) {
      const call = callInvite.accept();
      setCall(call);
    }
  };

  // 전화를 거부하는 함수
  const rejectCall = () => {
    if (callInvite) {
      callInvite.reject();
      setCallInvite(null);
    }
  };

  // Call 이벤트 핸들러
  const handleCallConnect = activeCall => {
    setCall(activeCall);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Incoming Call</Text>
      {callInvite && <Text>Caller Number: {callInvite.from}</Text>}
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

export default TwilioVoice2;
