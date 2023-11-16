import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {PRIMARY, SBTN, WHITE} from '../color';
import {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import Sbtn from '../components/Sbtn';
import SInfo from 'react-native-sensitive-info';
import {url} from '../url';

const EmergencyNumberScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [rel, setRel] = useState('');
  const [sensitivity, setSensitivity] = useState(1);
  const [sensitivityList, setSensitivityList] = useState([1, 2, 3]);

  const [phone, setPhone] = useState('');
  const [list, setList] = useState([]);
  const [editingSosId, setEditingSosId] = useState(null);

  const edit = item => {
    if (editingSosId === null) {
      setEditingSosId(item.sosId);
      setRel(item.relation);
      setSensitivity(item.level);
      setPhone(item.phoneNumber);
    } else {
      setEditingSosId(null);
      setRel('');
      setSensitivity(null);
      setPhone('');
    }
  };

  // 통신
  // 긴급연락처 추가, 수정
  const add = async () => {
    if (editingSosId === null) {
      // 추가
      await SInfo.getItem('Token', {}).then(value => {
        if (value) {
          fetch(`${url}/sos/add`, {
            method: 'POST',
            body: JSON.stringify({
              phoneNumber: phone,
              relation: rel,
              level: sensitivity,
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${value}`, // 토큰 사용
            },
          })
            .then(response => {
              response.status;
            })
            .then(data => {
              Alert.alert('등록 성공');
              console.log('add 성공: ' + data);
              check();
            })
            .catch(error => {
              console.error('add 실패: ' + error);
            });
        } else {
          console.log('토큰 없음');
        }
      });
    } else {
      // 수정
      await SInfo.getItem('Token', {}).then(value => {
        if (value) {
          fetch(`${url}/sos/update`, {
            method: 'POST',
            body: JSON.stringify({
              sosId: editingSosId,
              phoneNumber: phone,
              relation: rel,
              level: sensitivity,
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${value}`, // 토큰 사용
            },
          })
            .then(response => {
              response.status;
            })
            .then(data => {
              Alert.alert('수정 성공');
              console.log('update 성공: ' + data);
              // 수정이 성공한 후, 해당 항목을 업데이트합니다.
              const updatedList = list.map(item => {
                if (item.sosId === editingSosId) {
                  return {
                    ...item,
                    relation: rel,
                    level: sensitivity,
                    phoneNumber: phone,
                  };
                }
                return item;
              });
              setList(updatedList);
              setEditingSosId(null);
              setRel('');
              setSensitivity(null);
              setPhone('');
            })
            .catch(error => {
              console.error('update 실패: ' + error);
            });
        } else {
          console.log('토큰 없음');
        }
      });
    }
  };

  // 긴급연락처 조회
  const check = async () => {
    await SInfo.getItem('Token', {}).then(value => {
      if (value) {
        fetch(`${url}/sos/list`, {
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
            console.log('list 성공: ' + data);
            setList(data);
          })
          .catch(error => {
            console.error('list 실패: ' + error);
          });
      } else {
        console.log('토큰 없음');
      }
    });
  };

  // 긴급연락처 삭제
  const _delete = async sosId => {
    await SInfo.getItem('Token', {}).then(value => {
      if (value) {
        fetch(`${url}/sos/delete`, {
          method: 'POST',
          body: JSON.stringify({
            sosId: sosId,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${value}`, // 토큰 사용
          },
        })
          .then(response => {
            response.status;
          })
          .then(data => {
            console.log('delete 성공: ' + data);
            Alert.alert('삭제 성공');
            const updatedList = list.filter(item => item.sosId !== sosId);
            setList(updatedList);
            check();
          })
          .catch(error => {
            console.error('delete 실패: ' + error);
          });
      } else {
        console.log('토큰 없음');
      }
    });
  };

  useEffect(() => {
    check(); // 컴포넌트가 마운트될 때 데이터 fetch 시작
  }, []); // 빈 dependency array는 이 effect가 마운트와 언마운트 시에만 실행되게 함

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topText}>
          <Text>긴급 상황시 등록된 긴급 연락처로 연락</Text>
          <Text>민감도가 높을수록 위험 수치 높을 때 연락</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 30, marginBottom: 5}}>관계</Text>
          <Text style={{marginLeft: '38%', marginBottom: 5}}>민감도</Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 10, marginBottom: 20}}>
          <TextInput
            value={rel}
            style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            textContentType={'none'}
            keyboardAppearance={'light'}
            borderColor={SBTN.DARK}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            onChangeText={text => setRel(text.trim())}
          />
          <View
            style={{
              backgroundColor: WHITE,
              marginLeft: 20,
              borderRadius: 5,
              borderRightColor: SBTN.DARK,
              justifyContent: 'center',
            }}>
            <Picker
              style={styles.picker}
              selectedValue={sensitivity}
              onValueChange={(itemValue, itemIndex) =>
                setSensitivity(itemValue)
              }>
              {sensitivityList.map((list, index) => (
                <Picker.Item key={index} label={`${list}단계`} value={list} />
              ))}
            </Picker>
          </View>
        </View>
        <View>
          <Text style={{marginLeft: 30, marginBottom: 5}}>연락처</Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          <TextInput
            value={phone}
            style={[styles.input, {width: '65%'}]}
            autoCapitalize={'none'}
            autoCorrect={false}
            textContentType={'none'}
            keyboardAppearance={'light'}
            borderColor={SBTN.DARK}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            onChangeText={text => setPhone(text.trim())}
          />
          <Sbtn
            styles2={{
              container: {
                marginLeft: 20,
                width: 50,
                height: 40,
              },
              title: {fontSize: 12},
            }}
            title={'등록'}
            onPress={add}
          />
        </View>
      </View>
      <View style={styles.middle}>
        <Text style={{fontSize: 15, marginLeft: 30, fontWeight: '500'}}>
          등록된 연락처
        </Text>
      </View>
      <ScrollView style={styles.bottom}>
        <View style={{marginBottom: 30}}>
          {list.map((item, index) => (
            <View style={styles.listContainer} key={index}>
              <Text style={styles.listText}>{item.relation}</Text>
              <View style={styles.listback}>
                <Text style={styles.listText}>{item.phoneNumber}</Text>
                <Text style={[styles.listText]}>{item.level}단계</Text>
              </View>
              <Sbtn
                styles2={{title: {fontSize: 12}}}
                title={editingSosId === item.sosId ? '취소' : '수정'}
                onPress={() => edit(item)}
              />
              <Sbtn
                styles2={{
                  title: {fontSize: 12},
                  container: {backgroundColor: '#92B8E5'},
                }}
                title={'삭제'}
                onPress={() => _delete(item.sosId)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 0.8,
    backgroundColor: PRIMARY.LIGHT,
  },
  middle: {
    flex: 0.15,
    backgroundColor: SBTN.DEFAULT,
    justifyContent: 'center',
  },
  bottom: {
    flex: 0.5,
    backgroundColor: WHITE,
  },
  topText: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: WHITE,
    width: '40%',
    height: 40,
    marginLeft: 20,
    paddingLeft: 10,
  },
  picker: {borderColor: WHITE, width: 145, height: 30},
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  listback: {
    flexDirection: 'row',
    backgroundColor: '#F7F6F6',
    borderRadius: 5,
    width: '60%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  listText: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default EmergencyNumberScreen;
