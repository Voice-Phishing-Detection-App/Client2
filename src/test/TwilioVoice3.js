// import React, {useState, useEffect} from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import {DeviceEventEmitter} from 'react-native';
// import TwilioVoice from 'react-native-twilio-programmable-voice'; // Twilio Voice 라이브러리 추가

// const TwilioVoice3 = () => {
//   useEffect(() => {
//     // Twilio Voice 초기화
//     TwilioVoice.initWithAccessToken('YOUR_ACCESS_TOKEN'); // Twilio Access Token
//     DeviceEventEmitter.addListener('deviceReady', () => {
//       console.log('deviceready');
//     });

//     DeviceEventEmitter.addListener('callInvite', callInvite => {
//       console.log('Incoming Call');
//       // 여기서 전화 수락 또는 거부를 처리할 수 있습니다.
//     });

//     DeviceEventEmitter.addListener('incomingConnectionDidDisconnect', () => {
//       console.log('Incoming call disconnected');
//     });

//     DeviceEventEmitter.addListener('connectionDidDisconnect', data => {
//       if (data && data.call_state === 'DISCONNECTED') {
//         console.log('Call disconnected');
//       }
//     });
//   }, []);

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Incoming Call</Text>
//       <View style={{flexDirection: 'row'}}>
//         <TouchableOpacity
//           style={{
//             width: 100,
//             height: 40,
//             backgroundColor: 'green',
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: 5,
//           }}
//           onPress={() => {
//             // 전화 수락 로직
//           }}>
//           <Text style={{color: 'white'}}>Accept</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             width: 100,
//             height: 40,
//             backgroundColor: 'red',
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: 5,
//           }}
//           onPress={() => {
//             // 전화 거부 로직
//           }}>
//           <Text style={{color: 'white'}}>Reject</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default TwilioVoice3;
