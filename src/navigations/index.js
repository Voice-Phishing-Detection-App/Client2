import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import RNFetchBlob from 'rn-fetch-blob'; // rn-fetch-blob 라이브러리 추가
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {url} from '../url';
const RootStack = createStackNavigator();

const Navigation = () => {
  const directoryPath = `${
    Platform.OS === 'android'
      ? RNFetchBlob.fs.dirs.SDCardDir // Android의 내장 메모리 경로
      : RNFetchBlob.fs.dirs.DocumentDir // iOS 또는 다른 플랫폼의 내장 메모리 경로
  }/Call/`;
  const [mostRecentFile, setMostRecentFile] = useState(null);

  const formData = new FormData();
  formData.append('audio', {
    uri: mostRecentFile,
    type: 'audio/x-m4a',
    name: 'audio.m4a',
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);

      if (remoteMessage.data.call === 'incoming') {
        console.log('call', remoteMessage.data);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    askPermission();
    startListenerTapped();
  }, []);
  const startListenerTapped = () => {
    const callDetector = new CallDetectorManager(
      event => {
        if (event === 'Disconnected') {
          // 전화가 끊어지면 File 컴포넌트의 기능을 호출
          checkAndRequestPermission();
        }
      },
      true,
      () => {},
      {
        title: 'Phone State Permission',
        message:
          '이 앱은 전화 상태에 접근해야 하므로 전화가 수신되거나 전화 중일 때 반응하거나 적응하기 위해 권한이 필요합니다.',
      },
    );
  };

  const checkAndRequestPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    if (status === RESULTS.GRANTED) {
      getMostRecentFile();
    } else {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        console.log('저장소 권한이 승인되었습니다.');
        getMostRecentFile();
      } else {
        console.log('저장소 권한이 거부되었습니다.');
      }
    }
  };

  const getMostRecentFile = async () => {
    try {
      const files = await RNFetchBlob.fs.ls(directoryPath);
      if (files.length > 0) {
        files.sort(async (a, b) => {
          const statA = await RNFetchBlob.fs.stat(`${directoryPath}${a}`);
          const statB = await RNFetchBlob.fs.stat(`${directoryPath}${b}`);
          return statB.lastModified - statA.lastModified;
        });

        const mostRecentFile = files[0];
        setMostRecentFile(mostRecentFile); // 가장 최신 파일 경로!! 설정
      } else {
        console.log('디렉토리에 파일이 없습니다.');
      }
    } catch (error) {
      console.error('디렉토리 스캔 오류:', error);
    }
  };

  useEffect(() => {
    if (mostRecentFile) {
      sendFile();
    }
  }, [mostRecentFile]);

  const sendFile = async () => {
    console.log('file ' + mostRecentFile);
    if (mostRecentFile) {
      const formData = new FormData();
      formData.append('file', {
        uri: 'file://' + directoryPath + mostRecentFile,
        type: 'audio/x-m4a',
        name: mostRecentFile,
      });

      fetch(`${url}/stt`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          setMostRecentFile(null);
          if (response.ok) {
            return response.json();
          }
          return Error('업로드 실패');
        })
        .then(data => {
          console.log('업로드 성공', data);
        })
        .catch(error => {
          console.error('업로드 실패', error);
        });
    } else {
      console.log('mostRecentFile이 없어서 업로드를 수행할 파일이 없습니다.');
    }
  };
  const askPermission = async () => {
    try {
      const permissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      ]);
      console.log('Permissions are: ', permissions);
    } catch (err) {
      console.warn(err);
    }
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
