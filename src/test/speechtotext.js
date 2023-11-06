// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   Alert,
//   PermissionsAndroid,
//   Platform,
//   View,
//   StyleSheet,
//   Pressable,
//   LogBox,
// } from 'react-native';
// import Voice from '@react-native-voice/voice';

// const SpeechToText = () => {
//   LogBox.ignoreLogs([`new NativeEventEmitter()`]);
//   const [transcript, setTranscript] = useState('');

//   useEffect(() => {
//     requestMicrophonePermission();
//   }, []);

//   const requestMicrophonePermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//           {
//             title: 'Microphone Permission',
//             message:
//               'We need access to your microphone to perform speech to text.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );

//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert(
//             'Permission required',
//             'We need access to your microphone to perform speech to text',
//           );
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };
//   const startListening = async () => {
//     try {
//       console.log('시작');
//       await Voice.start('ko-KR');
//     } catch (error) {
//       console.error('Failed to start Voice:', error);
//     }
//   };

//   const stopListening = async () => {
//     try {
//       console.log('종료');
//       await Voice.stop();
//     } catch (error) {
//       console.error('Failed to stop Voice:', error);
//     }
//   };

//   const onSpeechResults = event => {
//     setTranscript(event.value[0]);
//     sendToServer(event.value[0]);
//   };

//   const sendToServer = async text => {
//     try {
//       fetch(`https://51c2-119-70-86-177.ngrok-free.app/doubt`, {
//         method: 'POST',
//         body: JSON.stringify({
//           phoneNumber: '01000000000',
//           text: text,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4NzM0NTYyNCwiZXhwIjoxNjg3NDE1NjI0fQ.SEx5fA-dpIJTksGZwge0W-zv9iQu5KEyLct5LHw3f6Nc2xGE1vx0m9nUX2EVBPEyw0_aH85PUbyvtvy8lLWgtA`,
//         },
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log(data); // 서버 응답 출력
//           Alert.alert(data.level + '단계 보이스피싱 위험 감지');
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     } catch (e) {
//       // 토큰 추출 에러
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     Voice.onSpeechResults = onSpeechResults;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Pressable style={styles.button} onPress={startListening}>
//         <Text style={{color: '#ffffff'}}>음성 시작</Text>
//       </Pressable>
//       <Pressable style={styles.button} onPress={stopListening}>
//         <Text style={{color: '#ffffff'}}>음성 종료</Text>
//       </Pressable>
//       <View style={styles.textbox}>
//         <Text>{transcript}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     width: 100,
//     height: 50,
//     backgroundColor: '#000000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textbox: {
//     width: 400,
//     height: 400,
//     borderWidth: 1,
//     marginTop: 40,
//   },
// });

// export default SpeechToText;
