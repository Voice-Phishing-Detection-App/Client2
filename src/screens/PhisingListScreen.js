import {FlatList, StyleSheet, Text, View} from 'react-native';
import ListItem from '../components/ListItem';
import EmptyList from '../components/EmptyList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const PhisingListScreen = () => {
  const List = [
    {
      id: 1,
      title: '저금리 대출 관련해서 보이스피싱',
      registrationDate: '2023-05-15',
      content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
      id: 2,
      title: '저금리 대출 관련해서 보이스피싱',
      registrationDate: '2023-05-15',
      content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
  ];

  return List.length ? (
    <View style={styles.container}>
      <FlatList
        data={List}
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

export default PhisingListScreen;
