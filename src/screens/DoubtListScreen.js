import {FlatList, View} from 'react-native';
import {useState, useEffect} from 'react';
import ListItem from '../components/ListItem';
import EmptyList from '../components/EmptyList';
import {url} from '../url';
import SInfo from 'react-native-sensitive-info';

const DoubtListScreen = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    console.log('doubt');
    check();
  }, []);

  const check = async () => {
    await SInfo.getItem('Token', {}).then(value => {
      if (value) {
        fetch(`${url}/doubt/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${value}`, // 토큰 사용
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log('doubtlistpage:', data);
            setList(data);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.log('토큰 없음');
      }
    });
  };

  return list.length ? (
    <FlatList
      data={list}
      renderItem={({item}) => <ListItem name="DoubtList" item={item} />}
      windowSize={5}
      ListHeaderComponent={View}
      ListHeaderComponentStyle={{height: 10}}
    />
  ) : (
    <EmptyList />
  );
};

export default DoubtListScreen;
