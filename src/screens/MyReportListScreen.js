import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from '../components/ListItem';
import EmptyList from '../components/EmptyList';
import {useEffect, useState} from 'react';
import {url} from '../url';
import SInfo from 'react-native-sensitive-info';

const typeToTitle = {
  REPORT_TYPE_FRAUD: '사기',
  REPORT_TYPE_IMPERSONATING: '사칭',
  REPORT_TYPE_INDUCE: '설치유도',
  REPORT_TYPE_DISGUISE: '사고빙자',
};

const MyReportListScreen = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    await SInfo.getItem('Token', {}).then(value => {
      if (value) {
        fetch(`${url}/report/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${value}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            data = data.map(item => {
              return {
                ...item,
                type: typeToTitle[item.type] || item.type,
              };
            });
            console.log(data);
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
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({item}) => <ListItem name="PhisingList" item={item} />}
        windowSize={5}
        ListHeaderComponent={View}
        ListHeaderComponentStyle={{height: 10}}
      />
    </View>
  ) : (
    <EmptyList />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyReportListScreen;
