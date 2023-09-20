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
      task: [
        '저금리 대출 관련해서 보이스피싱',
        '2023-05-15',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      ],
    },
    {
      id: 2,
      task: [
        '저금리 대출 관련해서 보이스피싱',
        '2023-05-15',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      ],
    },
    {
      id: 3,
      task: [
        '저금리 대출 관련해서 보이스피싱',
        '2023-05-15',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      ],
    },
    {
      id: 4,
      task: [
        '저금리 대출 관련해서 보이스피싱',
        '2023-05-15',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      ],
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
