import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import RNFetchBlob from 'rn-fetch-blob'; // rn-fetch-blob 라이브러리 추가
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const CallStateScreen = () => {
  const [featureOn, setFeatureOn] = useState(false);
  const [incoming, setIncoming] = useState(false);
  const [number, setNumber] = useState(null);
  let callDetector;
  const directoryPath = `${
    Platform.OS === 'android'
      ? RNFetchBlob.fs.dirs.SDCardDir // Android의 내장 메모리 경로
      : RNFetchBlob.fs.dirs.DocumentDir // iOS 또는 다른 플랫폼의 내장 메모리 경로
  }/Call/`;
  const [mostRecentFile, setMostRecentFile] = useState(null);

  useEffect(() => {
    askPermission();
    startListenerTapped();
  }, []);

  const checkAndRequestPermission = async () => {
    const status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    if (status === RESULTS.GRANTED) {
      getMostRecentFile();
    } else {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        console.log('권한이 승인되었습니다.');
        getMostRecentFile();
      } else {
        console.log('권한이 거부되었습니다.');
      }
    }
  };

  const getMostRecentFile = async () => {
    try {
      const files = await RNFetchBlob.fs.ls(directoryPath);
      if (files.length > 0) {
        console.log('파일들: ' + files);
        files.sort(async (a, b) => {
          const statA = await RNFetchBlob.fs.stat(`${directoryPath}${a}`);
          const statB = await RNFetchBlob.fs.stat(`${directoryPath}${b}`);
          return statB.lastModified - statA.lastModified;
        });

        const mostRecentFile = files[0];
        console.log('가장 최근 파일: ' + mostRecentFile);
        setMostRecentFile(mostRecentFile); // 가장 최신 파일을 설정
      } else {
        console.log('디렉토리에 파일이 없습니다.');
      }
    } catch (error) {
      console.error('디렉토리 스캔 오류:', error);
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

  const startListenerTapped = () => {
    setFeatureOn(true);
    callDetector = new CallDetectorManager(
      (event, num) => {
        console.log('event ', event, ' number ', num);
        if (event === 'Disconnected') {
          // 통화 종료 시
          setIncoming(false);
          setNumber(null);

          // 전화가 끊어지면 File 컴포넌트의 기능을 호출
          checkAndRequestPermission();
        } else if (event === 'Incoming') {
          // 수신 전화 시
          setIncoming(true);
          setNumber(num);
        } else if (event === 'Offhook') {
          // 통화 중 (Off-hook) 상태
          setIncoming(true);
          setNumber(num);
        } else if (event === 'Missed') {
          // 부재 중 전화 시
          setIncoming(false);
          setNumber(null);
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

  return (
    <View style={styles.body}>
      {incoming && <Text style={{fontSize: 50}}>{number}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'honeydew',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default CallStateScreen;
