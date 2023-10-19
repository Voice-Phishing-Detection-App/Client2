import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';

const CallStateScreen = () => {
  const [featureOn, setFeatureOn] = React.useState(false);
  const [incoming, setIncoming] = React.useState(false);
  const [number, setNumber] = React.useState(null);

  useEffect(() => {
    // 컴포넌트가 처음으로 마운트될 때 권한을 요청하는 함수를 호출
    askPermission();
  }, []);

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
    const callDetector = new CallDetectorManager(
      (event, num) => {
        console.log('event ', event, ' number ', num);
        if (event === 'Disconnected') {
          // 통화 종료 시
          setIncoming(false);
          setNumber(null);
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
      true, // 수신 전화의 전화 번호를 읽으려면 true로 설정 (ANDROID 전용)
      () => {}, // 권한이 거부될 경우 호출되는 콜백 (ANDROID 전용)
      {
        title: 'Phone State Permission',
        message:
          '이 앱은 전화 상태에 접근해야 하므로 전화가 수신되거나 전화 중일 때 반응하거나 적응하기 위해 권한이 필요합니다.',
      },
    );
  };

  const stopListenerTapped = () => {
    setFeatureOn(false);
    callDetector && callDetector.dispose();
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>통화 감지를 활성화하시겠습니까?</Text>
      <TouchableHighlight
        onPress={featureOn ? stopListenerTapped : startListenerTapped}>
        <View
          style={{
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: featureOn ? 'greenyellow' : 'red',
          }}>
          <Text style={styles.text}>{featureOn ? `활성화` : `비활성화`} </Text>
        </View>
      </TouchableHighlight>
      {incoming && <Text style={{fontSize: 50}}>수신 중 {number}</Text>}
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
  text: {
    padding: 20,
    fontSize: 20,
  },
});

export default CallStateScreen;
