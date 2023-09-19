import {View, StyleSheet} from 'react-native';
import TextInput, {ReturnKeyTypes} from '../components/TextInput';
import {useEffect, useRef, useState} from 'react';
import Button from '../components/Button';
import Sbtn from '../components/Sbtn';

const FindIdScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [number, setNumber] = useState('');
  const phoneRef = useRef(null);
  const numberRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(!name || !phone || !number);
  }, [name, phone, number]);

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        const data = await signIn(name, phone, number);
        setUser(data);
      } catch (e) {
        Alert.alert('아이디 찾기 실패', e, [
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
          title={'아이디 찾기'}
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

export default FindIdScreen;
