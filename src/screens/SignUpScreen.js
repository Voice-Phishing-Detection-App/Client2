import {View, StyleSheet, Keyboard, Alert} from 'react-native';
import TextInput, {ReturnKeyTypes} from '../components/TextInput';
import {useEffect, useRef, useState} from 'react';
import Button from '../components/Button';
import {url} from '../url';
import messaging from '@react-native-firebase/messaging';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    setDisabled(!name || !email || !password);
  }, [name, email, password]);

  const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('[FCM Token]', token);
    setFcmToken(token);
  };

  useEffect(() => {
    getFcmToken();
  }, []);

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      console.log('fcmtoken' + fcmToken);
      try {
        fetch(`${url}/signup`, {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            id: email,
            password: password,
            phoneNumber: phone,
            fcmToken: fcmToken,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.text())
          .then(data => {
            if (
              data === 'PHONENUMBER_DUPLICATED 이미 사용중인 전화번호입니다.'
            ) {
              // 전화번호 중복 에러 메시지를 처리
              Alert.alert('회원가입 실패', '이미 사용 중인 전화번호입니다.', [
                {
                  text: 'Ok',
                  onPress: () => setIsLoading(false),
                },
              ]);
            } else if (
              data ===
              'DEVICE_DUPLICATED 해당 기기에서 사용중인 계정이 존재합니다.'
            ) {
              Alert.alert(
                '회원가입 실패',
                '해당 기기에서 사용중인 계정이 존재합니다.',
                [
                  {
                    text: 'Ok',
                    onPress: () => setIsLoading(false),
                  },
                ],
              );
            } else {
              setIsLoading(false);
              Alert.alert('회원가입 완료');
              navigation.push('Auth');
            }
          })
          .catch(error => {
            console.error(error);
            setIsLoading(false);
          });
      } catch (e) {
        Alert.alert('회원가입 실패', e, [
          {
            text: 'Ok',
            onPress: () => setIsLoading(false),
          },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          value={name}
          onChangeText={text => setName(text.trim())}
          title={'이름'}
          returnKeyType={ReturnKeyTypes.NEXT}
          onSubmitEditing={() => phoneRef.current.focus()}
        />
        <TextInput
          ref={phoneRef}
          value={phone}
          onChangeText={text => setPhone(text.trim())}
          title={'전화번호'}
          returnKeyType={ReturnKeyTypes.NEXT}
          onSubmitEditing={() => emailRef.current.focus()}
        />
        <TextInput
          ref={emailRef}
          value={email}
          onChangeText={text => setEmail(text.trim())}
          title={'아이디'}
          returnKeyType={ReturnKeyTypes.NEXT}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <TextInput
          ref={passwordRef}
          value={password}
          onChangeText={text => setPassword(text.trim())}
          title={'비밀번호'}
          returnKeyType={ReturnKeyTypes.DONE}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'회원가입'}
          onPress={onSubmit}
          disabled={disabled}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '40%',
  },
  textContainer: {
    width: '70%',
  },
  buttonContainer: {
    width: '65%',
    padding: 5,
    marginTop: '10%',
  },
});

export default SignUpScreen;
