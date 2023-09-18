import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, Keyboard, Alert} from 'react-native';
import Button from '../components/Button';
import TextInput, {IconNames, ReturnKeyTypes} from '../components/TextInput';
import {PRIMARY} from '../color';
import PropTypes from 'prop-types';
import SInfo from 'react-native-sensitive-info';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        fetch(`${url}/login`, {
          method: 'POST',
          body: JSON.stringify({
            id: email,
            password: password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(async data => {
            const token = data.token; // 토큰 추출
            console.log(token);

            try {
              SInfo.setItem('Token', token, {}); // 되는지 확인 필요
              // 로그인 성공 후 메인 화면으로 이동
              navigation.navigate('Main');
            } catch (e) {
              Alert.alert('로그인 실패');
              console.error('token 에러: ' + e);
              setIsLoading(false);
            }
          })
          .catch(error => {
            console.error('tokne 만료:' + error);
            setIsLoading(false);
          });
      } catch (e) {
        Alert.alert('로그인 실패', e, [
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
      <Text style={styles.text}>피노키오</Text>
      <View style={styles.view}>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text.trim())}
          title={'아이디'}
          returnKeyType={ReturnKeyTypes.NEXT}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <TextInput
          ref={passwordRef}
          value={password}
          onChangeText={text => setPassword(text.trim())}
          title={'비밀번호'}
          secureTextEntry
          iconName={IconNames.PASSWORD}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.view2}>
        <View style={styles.buttonContainer}>
          <Button
            title={'로그인'}
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>
        <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.line} />
          <View>
            <Text style={{width: 40, textAlign: 'center'}}>또는</Text>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={'카카오 로그인'}
            onPress={() => {}}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={'네이버 로그인'}
            onPress={() => {}}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>
        <View style={styles.textContainer}>
          <Text onPress={() => navigation.push('FindId')}>아이디찾기</Text>
          <Text> | </Text>
          <Text onPress={() => navigation.push('FindPass')}>비밀번호찾기</Text>
          <Text> | </Text>
          <Text onPress={() => navigation.push('SignUp')}>회원가입</Text>
        </View>
      </View>
    </View>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    width: '70%',
  },
  view2: {
    width: '65%',
  },
  buttonContainer: {
    padding: 5,
    marginTop: 10,
  },
  textContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 5,
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 25,
    padding: 30,
    color: PRIMARY.DARK,
    fontWeight: 'bold',
  },

  line: {flex: 1, height: 1, backgroundColor: 'black'},
});

export default SignInScreen;
