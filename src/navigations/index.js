import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import RNFetchBlob from 'rn-fetch-blob'; // rn-fetch-blob 라이브러리 추가
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {url} from '../url';
import SInfo from 'react-native-sensitive-info';
import notifee from '@notifee/react-native';
const RootStack = createStackNavigator();

const Navigation = () => {
  const directoryPath = `${
    Platform.OS === 'android'
      ? RNFetchBlob.fs.dirs.SDCardDir // Android의 내장 메모리 경로
      : RNFetchBlob.fs.dirs.DocumentDir // iOS 또는 다른 플랫폼의 내장 메모리 경로
  }/Call/`;
  const [mostRecentFile, setMostRecentFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const formData = new FormData();
  formData.append('audio', {
    uri: mostRecentFile,
    type: 'audio/x-m4a',
    name: 'audio.m4a',
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);
      const title = remoteMessage?.notification?.title;
      const body = remoteMessage?.notification?.body;
      await onDisplayNotification({title, body});
    });
    return unsubscribe;
  }, []);

  const onDisplayNotification = async ({title = '', body = ''}) => {
    const channelId = await notifee.createChannel({
      id: 'channelId',
      name: 'channelName',
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
      },
    });
  };

  useEffect(() => {
    askPermission();
    startListenerTapped();
  }, []);
  const startListenerTapped = () => {
    const callDetector = new CallDetectorManager(
      (event, number) => {
        if (event === 'Incoming') {
          // 수신 전화 시
          setPhoneNumber(number);
        } else if (event === 'Disconnected') {
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
      setTimeout(() => {
        getMostRecentFile();
      }, 3000); // 3000 밀리초(3초) 지연
    } else {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        console.log('저장소 권한이 승인되었습니다.');
        setTimeout(() => {
          getMostRecentFile();
        }, 3000); // 3000 밀리초(3초) 지연
      } else {
        console.log('저장소 권한이 거부되었습니다.');
      }
    }
  };

  const getMostRecentFile = async () => {
    try {
      const files = await RNFetchBlob.fs.ls(directoryPath);
      if (files.length > 0) {
        const filesWithStats = await Promise.all(
          files.map(async file => {
            const stats = await RNFetchBlob.fs.stat(`${directoryPath}${file}`);
            return {file, lastModified: stats.lastModified};
          }),
        );

        filesWithStats.sort((a, b) => b.lastModified - a.lastModified);

        const mostRecentFile = filesWithStats[0].file;
        console.log('mos' + mostRecentFile);
        setMostRecentFile(mostRecentFile); // 가장 최신 파일 경로 설정
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

      SInfo.getItem('Token', {}).then(value => {
        if (value) {
          fetch(`${url}/stt`, {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${value}`, // 토큰 사용
            },
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              sendToMachineLearning(data.text);
              setMostRecentFile(null);
            })
            .catch(error => {
              console.error('업로드 실패', error);
            });
        } else {
          console.log('token 없음');
        }
      });
    } else {
      console.log('mostRecentFile이 없어서 업로드를 수행할 파일이 없습니다.');
    }
  };

  const sendToMachineLearning = async text => {
    SInfo.getItem('Token', {}).then(value => {
      if (value) {
        try {
          fetch(`${url}/doubt`, {
            method: 'POST',
            body: JSON.stringify({
              phoneNumber: phoneNumber,
              text: text,
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${value}`,
            },
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              console.log(data); // 서버 응답 출력
              // Alert.alert(data.level + '단계 보이스피싱 위험 감지');
            })
            .catch(error => {
              console.error('doubt' + error);
            });
        } catch (e) {
          // 토큰 추출 에러
          console.error('doubt' + e);
        }
      } else {
        console.log('token 없음');
      }
    });
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
