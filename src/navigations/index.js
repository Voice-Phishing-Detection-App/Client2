import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import messaging from '@react-native-firebase/messaging';
import SInfo from 'react-native-sensitive-info';
import {url} from '../url';
import React, {useEffect, useState} from 'react';
// import {PermissionsAndroid} from 'react-native';
// import CallDetectorManager from 'react-native-call-detection';
// import RNFetchBlob from 'rn-fetch-blob'; // rn-fetch-blob 라이브러리 추가
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import TwilioVoice3 from '../test/TwilioVoice3';
const RootStack = createStackNavigator();

const Navigation = () => {
  const [incoming, setIncoming] = useState(false);
  // const [number, setNumber] = useState(null);
  // const directoryPath = `${
  //   Platform.OS === 'android'
  //     ? RNFetchBlob.fs.dirs.SDCardDir // Android의 내장 메모리 경로
  //     : RNFetchBlob.fs.dirs.DocumentDir // iOS 또는 다른 플랫폼의 내장 메모리 경로
  // }/Call/`;
  // const [mostRecentFile, setMostRecentFile] = useState(null);
  const [twilioToken, setTwilioToken] = useState(null);
  const [incomingCall, setIncomingCall] = useState(false);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);

      if (remoteMessage.data.call === 'incoming') {
        console.log('call', remoteMessage.data);
        setIncomingCall(true);
        fcmget();
      }
    });
    return unsubscribe;
  }, []);

  const fcmget = async () => {
    const token = await messaging().getToken();
    console.log('token!!' + token);
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
        // SInfo.setItem('TwilioToken', data.twilioToken, {});
        SInfo.getItem('TwilioToken', data.twilioToken, {}).then(token => {
          if (token) {
            console.log('twilio token: ' + token);
            setTwilioToken(token);
          }
        });
      })
      .catch(error => {
        console.error('실패', error);
      });
  };

  if (incomingCall) {
    return <TwilioVoice3 />;
  }

  // useEffect(() => {
  //   askPermission();
  //   startListenerTapped();
  // }, []);

  // const checkAndRequestPermission = async () => {
  //   const status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

  //   if (status === RESULTS.GRANTED) {
  //     getMostRecentFile();
  //   } else {
  //     const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  //     if (result === RESULTS.GRANTED) {
  //       console.log('권한이 승인되었습니다.');
  //       getMostRecentFile();
  //     } else {
  //       console.log('권한이 거부되었습니다.');
  //     }
  //   }
  // };

  // const getMostRecentFile = async () => {
  //   try {
  //     const files = await RNFetchBlob.fs.ls(directoryPath);
  //     if (files.length > 0) {
  //       console.log('파일들: ' + files);
  //       files.sort(async (a, b) => {
  //         const statA = await RNFetchBlob.fs.stat(`${directoryPath}${a}`);
  //         const statB = await RNFetchBlob.fs.stat(`${directoryPath}${b}`);
  //         return statB.lastModified - statA.lastModified;
  //       });

  //       const mostRecentFile = files[0];
  //       console.log('가장 최근 파일: ' + mostRecentFile);
  //       setMostRecentFile(mostRecentFile); // 가장 최신 파일을 설정
  //     } else {
  //       console.log('디렉토리에 파일이 없습니다.');
  //     }
  //   } catch (error) {
  //     console.error('디렉토리 스캔 오류:', error);
  //   }
  // };

  // const askPermission = async () => {
  //   try {
  //     const permissions = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
  //       PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
  //     ]);
  //     console.log('Permissions are: ', permissions);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const startListenerTapped = () => {
  //   const callDetector = new CallDetectorManager(
  //     (event, num) => {
  //       console.log(event + ' ' + num);
  //       if (event === 'Disconnected') {
  //         // 통화 종료 시
  //         setIncoming(false);
  //         // setNumber(null);

  //         // 전화가 끊어지면 File 컴포넌트의 기능을 호출
  //         checkAndRequestPermission();
  //       }
  //       //전화 끊었을때만 파악하면 되긴함! 그래서 일단 주석
  //       // else if (event === 'Incoming') {
  //       //   // 수신 전화 시
  //       //   setIncoming(true);
  //       //   setNumber(num);
  //       // } else if (event === 'Offhook') {
  //       //   // 통화 중 (Off-hook) 상태
  //       //   setIncoming(true);
  //       //   setNumber(num);
  //       // } else if (event === 'Missed') {
  //       //   // 부재 중 전화 시
  //       //   setIncoming(false);
  //       //   setNumber(null);
  //       // }
  //     },
  //     true,
  //     () => {},
  //     {
  //       title: 'Phone State Permission',
  //       message:
  //         '이 앱은 전화 상태에 접근해야 하므로 전화가 수신되거나 전화 중일 때 반응하거나 적응하기 위해 권한이 필요합니다.',
  //     },
  //   );
  // };

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
