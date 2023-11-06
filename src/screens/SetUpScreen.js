import {StyleSheet, Switch, Text, View} from 'react-native';
import {GRAY, PRIMARY, WHITE} from '../color';
import {useState} from 'react';

const SetUpScreen = () => {
  const [isEnabled1, setIsEnabled1] = useState(true); //임의지정
  const [emergency, setIEmergency] = useState(true); //임의지정
  const [calling, setCalling] = useState(true); //임의지정

  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIEmergency(previousState => !previousState);
  const toggleSwitch3 = () => setCalling(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.containerRadius}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>보이스피싱 탐지 알림</Text>
          <View style={styles.switchStyle}>
            <Switch
              trackColor={{false: GRAY, true: PRIMARY.DEFAULT}}
              thumbColor={WHITE}
              ios_backgroundColor={GRAY}
              onValueChange={toggleSwitch3}
              value={calling}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>통화 후 알림</Text>
          <View style={styles.switchStyle}>
            <Switch
              trackColor={{false: GRAY, true: PRIMARY.DEFAULT}}
              thumbColor={WHITE}
              ios_backgroundColor={GRAY}
              onValueChange={toggleSwitch1}
              value={isEnabled1}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>긴급 연락처 문자 전송</Text>
          <View style={styles.switchStyle}>
            <Switch
              trackColor={{false: GRAY, true: PRIMARY.DEFAULT}}
              thumbColor={WHITE}
              ios_backgroundColor={GRAY}
              onValueChange={toggleSwitch2}
              value={emergency}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY.LIGHT,
  },
  containerRadius: {
    backgroundColor: WHITE,
    flex: 1,
    margin: 25,
    borderRadius: 15,
  },
  textContainer: {
    position: 'relative',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: GRAY,
    paddingVertical: 30,
  },
  text: {
    position: 'absolute',
    left: 0,
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  switchStyle: {
    position: 'absolute',
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default SetUpScreen;
