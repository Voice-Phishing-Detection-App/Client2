import React, {useEffect} from 'react';
import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  Button,
} from 'react-native';

// 플랫폼 상수 정의
const ANDROID = 'android';
const IOS = 'ios';

// TwilioVoice 모듈을 가져와 TwilioVoice 변수에 할당
const TwilioVoice = NativeModules.RNTwilioVoice;

// NativeAppEventEmitter를 사용하여 네이티브 이벤트를 수신할 객체 생성
const NativeAppEventEmitter = new NativeEventEmitter(TwilioVoice);

// Twilio 모듈을 정의
const TwilioVoice4 = ({token}) => {
  // Twilio 액세스 토큰을 사용하여 라이브러리 초기화
  // 초기화 시작 시 {initialized: true} 반환
  // 초기화가 성공했는지 확인하려면 deviceReady 및 deviceNotReady 이벤트를 수신
  useEffect(() => {
    // if (Platform.OS === ANDROID) {
    //   console.log('권한 요청');
    //   TwilioVoice.requestPermissions(token);
    // }
    getCall();
  }, []);
  const getCall = async () => {
    try {
      console.log('4token ' + token);
      const success = await TwilioVoice.initWithAccessToken(token);
      console.log('4suc' + success);
      //   TwilioVoice.initWithAccessToken(token);
      TwilioVoice.connect(success); //전화 연결 이거맞는지 모름

      TwilioVoice.addEventListener('callStateRinging', function (data) {
        console.log('ringing ' + data);
        //   {
        //       call_sid: string,  // Twilio call sid
        //       call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
        //       call_from: string, // "+441234567890"
        //       call_to: string,   // "client:bob"
        //   }
      });
    } catch (err) {
      console.log('4err ' + err);
    }
  };

  // 전화 연결
  // const connect = (params) => {
  //     console.log("connect");
  //     TwilioVoice.connect(params);
  //   };

  // 전화 끊기
  const disconnect = () => {
    console.log('disconnect');
    TwilioVoice.disconnect();
  };
  // 전화 수락
  const accept = () => {
    console.log('accept');
    TwilioVoice.accept();
  };
  // 전화 거부
  const reject = () => {
    console.log('reject');
    TwilioVoice.reject();
  };
  // // 전화 무시
  // ignore() {
  //     TwilioVoice.ignore();
  // },
  // // 음소거 설정
  // setMuted: TwilioVoice.setMuted,
  // // 스피커 모드 설정
  // setSpeakerPhone(value) {
  //     if (Platform.OS === ANDROID) {
  //         return;
  //     }
  //     TwilioVoice.setSpeakerPhone(value);
  // },
  // // DTMF 문자 전송
  // sendDigits: TwilioVoice.sendDigits,
  // // 전화 대기
  // hold: TwilioVoice.setOnHold,

  // 권한 요청(Android에서 사용)
  // // 활성 전화 가져오기
  // getActiveCall: TwilioVoice.getActiveCall,
  // // 전화 수신 정보 가져오기
  // getCallInvite: TwilioVoice.getCallInvite,
  // // 등록 해제
  // unregister() {
  //     TwilioVoice.unregister();
  // },
  // // 오디오 장치 목록 가져오기
  // getAudioDevices() {
  //     if (Platform.OS === IOS) {
  //         return;
  //     }
  //     TwilioVoice.getAudioDevices();
  // },
  // // 선택된 오디오 장치 가져오기
  // getSelectedAudioDevice() {
  //     if (Platform.OS === IOS) {
  //         return;
  //     }
  //     TwilioVoice.getSelectedAudioDevice();
  // },
  // // 오디오 장치 선택
  // selectAudioDevice(name) {
  //     if (Platform.OS === IOS) {
  //         return;
  //     }
  //     TwilioVoice.selectAudioDevice(name);
  // },
  const addEventListener = (type, handler) => {
    if (!_eventHandlers.hasOwnProperty(type)) {
      throw new Error('Event handler not found: ' + type);
    }
    if (_eventHandlers[type] && _eventHandlers[type].has(handler)) {
      return;
    }
    // 네이티브 이벤트 리스너 등록
    _eventHandlers[type].set(
      handler,
      NativeAppEventEmitter.addListener(type, rtn => {
        handler(rtn);
      }),
    );
  };
  const removeEventListener = (type, handler) => {
    if (!_eventHandlers[type].has(handler)) {
      return;
    }
    // 네이티브 이벤트 리스너 제거
    _eventHandlers[type].get(handler).remove();
    _eventHandlers[type].delete(handler);
  };
  return (
    <>
      <Button title="전화 수락" onPress={accept} />
      <Button title="전화 거부" onPress={reject} />
    </>
  );
};

// Twilio 모듈 내보내기
export default TwilioVoice4;
