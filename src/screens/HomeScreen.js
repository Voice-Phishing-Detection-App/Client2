import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BLACK, PRIMARY, SBTN, WHITE} from '../color';
import {Image} from 'react-native';
import Balloon from 'react-native-balloon';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.containertop}>
        <Image
          source={require('../../assets/images/Phinocchio.png')}
          style={styles.image}
          resizeMode={'cover'}
        />
        <View style={styles.ballooncontainer}>
          <Balloon
            borderColor={WHITE}
            backgroundColor={WHITE}
            borderWidth={8}
            borderRadius={10}
            triangleSize={13}
            triangleDirection="left"
            triangleOffset="65%"
            height={100}
            width={180}>
            <Text style={{fontSize: 14}}>
              문예주님 안녕하세요.{'\n'}오늘 총 신고 기록은{'\n'}3번 있어요.
            </Text>
          </Balloon>
        </View>
      </View>
      <View style={styles.containerbottom}>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('CenterList');
            }}
            hitSlop={10}
            style={styles.button}>
            <Icon name="bulb-outline" size={25} color={WHITE} />
          </Pressable>
          <Text style={styles.buttontxt}>피싱 도움</Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('PhisingList');
            }}
            hitSlop={10}
            style={styles.button}>
            <Icon name="chatbox-ellipses-outline" size={25} color={WHITE} />
          </Pressable>
          <Text style={styles.buttontxt}>피해 사례</Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('EmergencyNumber');
            }}
            hitSlop={10}
            style={styles.button}>
            <Icon name="person-outline" size={25} color={WHITE} />
          </Pressable>
          <Text style={styles.buttontxt}>긴급 연락처</Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('MyReportList');
            }}
            hitSlop={10}
            style={styles.button}>
            <Icon name="reader-outline" size={25} color={WHITE} />
          </Pressable>
          <Text style={styles.buttontxt}>신고 기록</Text>
        </View>
        {/* <View>
          <Pressable
            onPress={() => {
              navigation.navigate('t');
            }}
            hitSlop={10}
            style={styles.button}>
            <Icon name="reader-outline" size={25} color={WHITE} />
          </Pressable>
          <Text style={styles.buttontxt}>twilio</Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containertop: {
    flex: 1,
    backgroundColor: SBTN.DEFAULT,
  },
  containerbottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 40,
    paddingHorizontal: 20,
    flex: 2,
    backgroundColor: WHITE,
  },
  image: {
    height: 160,
    width: 160,
    position: 'absolute',
    top: 15,
  },
  ballooncontainer: {
    position: 'absolute',
    top: 15,
    right: 30,
  },
  button: {
    marginRight: 15,
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DEFAULT,
  },
  buttontxt: {
    color: BLACK,
    fontSize: 13,
  },
});

export default HomeScreen;
