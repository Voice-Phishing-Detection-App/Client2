import {StyleSheet, TextInput, View, ScrollView, Alert} from 'react-native';
import ReportBox from '../components/ReportBox';
import {useState} from 'react';
import IconText from '../components/IconText';
import {Picker} from '@react-native-picker/picker';
import {GRAY, PRIMARY, WHITE} from '../color';
import Sbtn from '../components/Sbtn';
import {url} from '../url';
import SInfo from 'react-native-sensitive-info';
import {useEffect} from 'react';

const ReportScreen = ({route, navigation}) => {
  const {id} = route.params || 0;
  const [select, setSelect] = useState(true);
  const [selectDoubt, setSelectDoubt] = useState(null);
  const [doubtList, setDoubtList] = useState([]);
  //그냥 선택해도 같이 전화번호 받아올 수 있어야함!
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [typeList, setTypeList] = useState([
    'REPORT_TYPE_FRAUD',
    'REPORT_TYPE_IMPERSONATING',
    'REPORT_TYPE_INDUCE',
    'REPORT_TYPE_DISGUISE',
  ]);
  const [ktypeList, setKTypeList] = useState([
    '사기',
    '사칭',
    '설치유도',
    '사고빙자',
  ]);
  const [type, setType] = useState(typeList[0]);
  const [ktype, setKType] = useState(ktypeList[0]);
  const [content, setContent] = useState('');
  const [list, setList] = useState([]);
  const [filteredObject, setFilteredObject] = useState([]);

  useEffect(() => {
    console.log('id ', id);
    check();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      setDoubtList(list.map(item => item.title));
      console.log('len:', doubtList);
      if (id) {
        setFilteredObject(list.find(item => item.doubtId === id));
      }
      // else {
      //   setFilteredObject(list.find((item) => item.title === doubtList[0]));
      //   console.log('ddd:', doubtList);
      //   console.log('select[0]:', doubtList[0]);
      //   console.log('ddd:', filteredObject);
      //   console.log('phonenumber:', filteredObject.phoneNumber);
      //   setPhoneNumber(filteredObject.phoneNumber);
      // }
    }
  }, [list, id]);

  const check = async () => {
    SInfo.getItem('Token', {}).then(value => {
      if (value) {
        fetch(`${url}/doubt/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${value}`, // 토큰 사용
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // API 응답 처리
            //반복문 돌면서 ? doubtID같은거?
            console.log('data:', data);
            setList(data);
            // console.log(list);
            // setDoubtList(list.map((item) => item.title));
            // setPhoneNumber(doubtList.phoneNumber);
            // console.log('list: ', doubtList);

            // console.log('id:', id);
            //이거는 의심내역 클릭해서 넘어왔을때!
            // if (id) {
            //doubtlist 돌면서 doubtID같은거 찾아서 그 안에 있는 object 만 가져오기
            // doubtId와 일치하는 객체만 가져오기
            // console.log(doubtList);

            // filteredObject를 이용하여 원하는 작업을 수행합니다.
            // 예를 들어, filteredObject의 title 값을 출력하고 싶다면:
            // console.log('A');
            // console.log(filteredObject);
            // console.log(filteredObject.title);
            // }
          })
          .catch(error => {
            console.error('doubt get error' + error);
          });
      } else {
        console.log('토큰 없음');
      }
    });
  };

  const onReport = () => {
    if (select) {
      add();
    } else {
      addWithout();
    }
  };

  const add = async () => {
    SInfo.getItem('Token', {}).then(value => {
      if (value) {
        fetch(`${url}/report/add`, {
          method: 'POST',
          body: JSON.stringify({
            type: type, //바꿔야함 영어뭐시기로
            title: filteredObject.title,
            content: content,
            phoneNumber: filteredObject.phoneNumber, //수정필요
            voiceId: filteredObject.voice_id, //수정필요
            doubtId: filteredObject.doubtId,
          }), // 여기 통신할거 json 형식으로 넣기
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${value}`, // 토큰 사용
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // API 응답 처리
            console.log(data);
            Alert.alert('신고가 접수되었습니다. 감사합니다.');
            setType('REPORT_TYPE_FRAUD');
            setFilteredObject([]);
            setContent('');
            setPhoneNumber(null);
            setType(typeList[0]);
            setKType(null);
          })
          .catch(error => {
            console.error('report add error' + error);
          });
      } else {
        console.log('토큰 없음');
      }
    });
  };

  const addWithout = async () => {
    console.log('의심내역 x');
    SInfo.getItem('Token', {}).then(value => {
      if (value) {
        fetch(`${url}/report/add/withoutDoubt`, {
          method: 'POST',
          body: JSON.stringify({
            type: type,
            title: ktype,
            content: content,
            phoneNumber: phoneNumber,
          }), // 여기 통신할거 json 형식으로 넣기
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${value}`, // 토큰 사용
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // API 응답 처리
            console.log(data);
            Alert.alert('신고가 접수되었습니다. 감사합니다.');
            setType('REPORT_TYPE_FRAUD');
            setFilteredObject([]);
            setContent('');
            setPhoneNumber(null);
            setType(typeList[0]);
            setKType(null);
          })
          .catch(error => {
            console.error('report/add/withoutDoubt error' + error);
          });
      } else {
        console.log('토큰 없음');
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <ReportBox text="통화 후 의심 판정 여부" />
      <View style={{flexDirection: 'row'}}>
        <IconText
          text="예"
          name={select}
          onPress={() => {
            setSelect(true);
          }}
        />
        <IconText
          text="아니요"
          name={!select}
          onPress={() => {
            setSelect(false);
          }}
        />
      </View>
      {select && (
        <>
          <ReportBox text="의심 내역" />
          <Picker
            style={styles.picker}
            selectedValue={selectDoubt}
            onValueChange={(itemValue, itemIndex) => {
              //doubtlist 돌면서 doubtID같은거 찾아서 그 안에 있는 object 만 가져오기
              //doubtId와 일치하는 객체만 가져오기
              setFilteredObject(list.find(item => item.title === itemValue));
              setSelectDoubt(itemValue);
              setPhoneNumber(filteredObject.phoneNumber);
            }}>
            {doubtList.map((title, index) => (
              <Picker.Item key={index} label={title} value={title} />
            ))}
          </Picker>
        </>
      )}
      <ReportBox text="전화번호 입력" />
      <View style={{padding: 30}}>
        <TextInput
          style={styles.phone}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text.trim())}
          placeholder={phoneNumber == '' ? phoneNumber : '- 빼고 적어주세요'}
        />
      </View>
      <ReportBox text="신고 유형" />
      <Picker
        style={styles.picker}
        selectedValue={ktype}
        onValueChange={(itemValue, itemIndex) => {
          setType(typeList[itemIndex]);
          setKType(itemValue);
        }}>
        {ktypeList.map((rl, index) => (
          <Picker.Item key={index} label={rl} value={rl} />
        ))}
      </Picker>
      <ReportBox text="신고 내용(선택)" />
      <View style={{padding: 30}}>
        <TextInput
          style={[styles.phone, {height: 150}]}
          value={content}
          onChangeText={setContent}
          placeholder="자유롭게 적어주세요"
        />
      </View>
      <Sbtn styles2={style2} title="신고" onPress={onReport} />
    </ScrollView>
  );
};

const style2 = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY.DEFAULT,
    width: 70,
    height: 40,
    marginLeft: '75%',
    marginBottom: '5%',
  },
  title: {
    color: WHITE,
    fontSize: 13,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  picker: {width: '80%', height: 70, marginLeft: 30},
  phone: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 45,
    borderColor: GRAY,
    paddingLeft: 20,
  },
});

export default ReportScreen;
