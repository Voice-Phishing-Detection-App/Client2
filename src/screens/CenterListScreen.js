import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import ListItem from '../components/ListItem';
import EmptyList from '../components/EmptyList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const CenterListScreen = () => {
  const List = [
    {
      id: 1,
      task: ['예주 은행', '010-0000-0000'],
    },
    {
      id: 2,
      task: ['예주 은행', '010-0000-0000'],
    },
    {
      id: 3,
      task: ['예주 은행', '010-0000-0000'],
    },
    {
      id: 4,
      task: ['예주 은행', '010-0000-0000'],
    },
  ];

  return List.length ? (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={List}
        renderItem={({item}) => <ListItem name="CenterList" item={item} />}
        windowSize={5}
        ListHeaderComponent={View}
        ListHeaderComponentStyle={{height: 10}}
      />
    </SafeAreaView>
  ) : (
    <EmptyList />
  );
};

export default CenterListScreen;
