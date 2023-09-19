import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GRAY, PRIMARY, WHITE} from '../color';
import {useNavigation} from '@react-navigation/native';
import Sbtn from '../components/Sbtn';
import AppModal from '../components/AppModal';
import {useState} from 'react';
import SInfo from 'react-native-sensitive-info';

const MyPageScreen = () => {
  const user = '신혜민';
  const password = '1234';
  const pwdLen = password.length;
  const phonenumber = '01000000000';
  const hiddentxt = '*';
  const blank = '     ';

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); // 모달의 가시성을 제어하는 상태 변수 선언

  const toggleModal = () => {
    setModalVisible(!modalVisible); // 모달 가시성 토글 함수 정의
  };

  const logout = async () => {
    await SInfo.deleteItem('Token', {})
      .then(() => {
        console.log('토큰 삭제 완료');
        navigation.navigate('Auth');
      })
      .catch(error => {
        console.log('토큰 삭제 실패', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.title}>로그인 정보</Text>
        <View style={styles.containerInfo}>
          <Text style={styles.loginInfo}>이름</Text>
          <Text style={styles.loginInfo}>{user}</Text>
          <Text style={styles.loginInfo}>{blank}</Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.loginInfo}>비밀번호</Text>
          <Text style={styles.loginInfo}>{password}</Text>
          <Sbtn title={'변경'} onPress={toggleModal} />
        </View>

        <View style={styles.containerInfo}>
          <Text style={styles.loginInfo}>연락처</Text>
          <Text style={styles.loginInfo}>{phonenumber}</Text>
          <Sbtn title={'변경'} onPress={toggleModal} />
        </View>
      </View>
      <View style={styles.containerMiddle}>
        <Pressable
          onPress={() => {
            navigation.navigate('MyReportList');
          }}
          hitSlop={10}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>신고 기록</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('SetUp');
          }}
          hitSlop={10}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>알림 설정</Text>
          </View>
        </Pressable>
        <Pressable onPress={logout} hitSlop={10}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>로그아웃</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}} hitSlop={10}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>탈퇴하기</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.containerBottom}>
        <Text>로그인 연동 API</Text>
      </View>
      <View>
        <AppModal modalVisible={modalVisible} toggleModal={toggleModal} />
      </View>
    </View>
  );
};
MyPageScreen.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  containerTop: {
    flex: 0.35,
    borderBottomWidth: 1,
    borderColor: GRAY,
  },
  containerMiddle: {
    flex: 0.45,
  },
  containerBottom: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GRAY,
    paddingVertical: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    backgroundColor: PRIMARY.LIGHT,
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingVertical: 9,
    marginBottom: 12,
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  loginInfo: {
    marginVertical: 12,
  },
});
export default MyPageScreen;
