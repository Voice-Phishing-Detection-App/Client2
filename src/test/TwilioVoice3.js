import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DeviceEventEmitter} from 'react-native';
import TwilioVoice from 'react-native-twilio-programmable-voice'; // Twilio Voice 라이브러리 추가
import SInfo from 'react-native-sensitive-info';

const TwilioVoice3 = ({token}) => {
  useEffect(() => {
    getCall();
  }, []);
  const getCall = async () => {
    // Twilio Voice 초기화
    // const twilioToken = await getTwilioToken();
    const twilioToken = token;
    console.log('??' + twilioToken);
    // await TwilioVoice.initWithAccessToken(twilioToken); // Twilio Access Token
    try {
      const success = await TwilioVoice.initWithAccessToken(twilioToken);
      console.log('suc' + success);
    } catch (err) {
      console.log(err);
    }
    TwilioVoice.addEventListener('callStateRinging', function (data) {
      console.log('twiliovoice ' + data);
      //   {
      //       call_sid: string,  // Twilio call sid
      //       call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
      //       call_from: string, // "+441234567890"
      //       call_to: string,   // "client:bob"
      //   }
    });
    DeviceEventEmitter.addListener('deviceReady', () => {
      console.log('deviceready');
    });

    DeviceEventEmitter.addListener('callInvite', callInvite => {
      console.log('Incoming Call');
    });

    DeviceEventEmitter.addListener('incomingConnectionDidDisconnect', () => {
      console.log('Incoming call disconnected');
    });

    DeviceEventEmitter.addListener('connectionDidDisconnect', data => {
      if (data && data.call_state === 'DISCONNECTED') {
        console.log('Call disconnected');
      }
    });
  };

  const getTwilioToken = async () => {
    try {
      const token = await SInfo.getItem('TwilioToken', {});
      return token;
    } catch (error) {
      console.error('twilio token error ' + error);
      throw error;
    }
  };

  const acceptCall = () => {
    TwilioVoice.acceptCallInvite()
      .then(() => console.log('Call accepted'))
      .catch(error => console.error('Failed to accept call', error));
  };

  const rejectCall = () => {
    TwilioVoice.rejectCallInvite()
      .then(() => console.log('Call rejected'))
      .catch(error => console.error('Failed to reject call', error));
  };

  //   const getFCM = async () => {
  //     const token = await messaging().getToken();
  //     await fetch(`${url}/twilio/token`, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         fcmToken: token,
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data.twilioToken);
  //         SInfo.setItem('TwilioToken', data.twilioToken, {});
  //       })
  //       .catch(error => {
  //         console.error('실패', error);
  //       });
  //   };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Incoming Call</Text>
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
