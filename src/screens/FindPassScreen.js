import {View, StyleSheet} from 'react-native';
import TextInput, {ReturnKeyTypes} from '../components/TextInput';
import {useEffect, useRef, useState} from 'react';
import Button from '../components/Button';
import Sbtn from '../components/Sbtn';

const FindPassScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [number, setNumber] = useState('');
  const phoneRef = useRef(null);
  const numberRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(!email || !phone || !number);
  }, [email, phone, number]);

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        const data = await signIn(email, phone, number);
        setUser(data);
      } catch (e) {
        Alert.alert('비밀번호 찾기 실패', e, [
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
          value={email}
          onChangeText={text => setEmail(text.trim())}
          title={'아이디'}
          returnKeyType={ReturnKeyTypes.NEXT}
          onSubmitEditing={() => phoneRef.current.focus()}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
          <TextInput
            ref={phoneRef}
            value={phone}
            onChangeText={text => setPhone(text.trim())}
            title={'전화번호'}
            returnKeyType={ReturnKeyTypes.NEXT}
            onSubmitEditing={() => numberRef.current.focus()}
          />
          <Sbtn title={'인증'} onPress={() => {}} />
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
          <TextInput
            ref={numberRef}
            value={number}
            onChangeText={text => setNumber(text.trim())}
            title={'인증번호'}
            returnKeyType={ReturnKeyTypes.DONE}
          />
          <Sbtn title={'확인'} onPress={() => {}} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'비밀번호 찾기'}
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
    marginTop: '40%',
    alignItems: 'center',
  },
  textContainer: {
    width: '68%',
  },
  buttonContainer: {
    width: '65%',
    padding: 5,
    marginTop: '10%',
  },
});

export default FindPassScreen;
