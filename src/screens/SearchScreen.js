import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import {BLACK, GRAY, PRIMARY, SBTN, WHITE} from '../color';
import {useState} from 'react';
import Sbtn from '../components/Sbtn';
import ReportList from '../components/ReportList';
import {useNavigation} from '@react-navigation/native';
import {url} from '../url';
import SInfo from 'react-native-sensitive-info';
import Icon from 'react-native-vector-icons/Ionicons';

const Left = 30;

const typeToTitle = {
  REPORT_TYPE_FRAUD: '사기',
  REPORT_TYPE_IMPERSONATING: '사칭',
  REPORT_TYPE_INDUCE: '설치유도',
  REPORT_TYPE_DISGUISE: '사고빙자',
  REPORT_TYPE_NONE: '신고 내역이 없습니다',
};

const SearchScreen = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [count, setCount] = useState('');
  const [type, setType] = useState([]);
  const onCheck = async () => {
    SInfo.getItem('Token', {}).then(value => {
      if (value) {
        // 토큰 있을때
        fetch(`${url}/report/search`, {
          method: 'POST',
          body: JSON.stringify({phoneNumber: phoneValue}),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${value}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            setPhoneNumber(data.phoneNumber);
            setCount(data.reportCount);
            const transformedTypes = data.type.map(t => typeToTitle[t] || t);
            setType(transformedTypes);
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        // 토큰 없을때
        console.log('토큰 없음');
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.top, {backgroundColor: PRIMARY.DEFAULT}]}>
        <Text style={styles.title}>번호 조회</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.search}
            value={phoneValue}
            onChangeText={text => setPhoneValue(text.trim())}
            placeholder="전화번호 입력"
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
          />
          <View style={styles.icon}>
            <Icon
              name="search-outline"
              size={20}
              color={(() => {
                switch (true) {
                  case isFocused:
                    return BLACK;
                  case !!phoneValue: {
                    return BLACK;
                  }
                  default:
                    return GRAY;
                }
              })()}
            />
          </View>
          <Sbtn styles2={style2} title={'조회'} onPress={onCheck} />
        </View>
      </View>
      <View style={styles.middle}>
        <Text style={styles.middletext}>신고 정보</Text>
      </View>
      <ScrollView style={styles.bottom}>
        {count > 0 && (
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 20,
            }}
            onPress={() => {
              navigation.navigate('SearchList', {phoneNumber});
            }}>
            <Icon name="caret-forward-outline" size={15} color="black" />
            <Text style={{fontSize: 18, marginLeft: 15}}>자세히 보기</Text>
          </Pressable>
        )}
        <ReportList list={'전화번호'} item={phoneNumber} />
        <ReportList list={'횟수'} item={count.toString()} />
        {Array.isArray(type) &&
          type.length > 0 &&
          type.map((item, index) => (
            <ReportList
              list={index === 0 ? '유형' : ''}
              item={item}
              key={index}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const style2 = StyleSheet.create({
  container: {width: 50, height: 50, marginLeft: 13, borderRadius: 5},
  title: {fontSize: 12, fontWeight: '600'},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
  },
  middle: {
    flex: 0.2,
    backgroundColor: SBTN.DEFAULT,
    justifyContent: 'center',
  },
  bottom: {
    flex: 2,
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 23,
    color: WHITE,
    fontWeight: '700',
    padding: Left,
    marginTop: '10%',
  },
  search: {
    backgroundColor: WHITE,
    width: '70%',
    height: 50,
    borderRadius: 5,
    marginLeft: Left,
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    marginLeft: Left + 10,
  },
  middletext: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: Left,
  },
});

export default SearchScreen;
