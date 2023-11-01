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
            triangleSize={20}
            triangleDirection="bottom"
            triangleOffset="28%"
            height={310}
            width={370}>
            <Text
              style={{
                fontSize: 16,
              }}>
              {/* 문예주님 안녕하세요.{'\n'}오늘 총 신고 기록은{'\n'}3번 있어요. */}
              보이스 피싱 탐지 기능을 사용하기 위해서는 설정이 필요합니다.
              {'\n\n'}
              1. Android 기기에서 전화 앱 을 엽니다.{'\n'}2. 오른쪽 상단에서
              옵션 더보기 : {'->'} 설정 {'->'} 통화 녹음을 탭합니다.{'\n'}3.
              통화 자동 녹음을 활성화 합니다.{'\n'}4. 통화 자동 녹음을 열어 모든
              번호를 사용 설정합니다. {'\n\n'}중요: 전화 통화 녹음과 관련된 모든
              법률을 준수할 책임은 사용자에게 있습니다.
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containertop: {
    flex: 4,
    backgroundColor: SBTN.DEFAULT,
  },
  containerbottom: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 40,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: WHITE,
  },
  image: {
    height: 180,
    width: 200,
    position: 'absolute',
    bottom: 0,
  },
  ballooncontainer: {
    position: 'absolute',
    top: 0,
    right: 0,
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
