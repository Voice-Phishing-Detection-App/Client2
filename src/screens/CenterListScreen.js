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
      id: 0,
      task: ['KB국민은행', '1588-9999'],
    },
    {
      id: 1,
      task: ['KDB산업은행', '1588-1500'],
    },
    {
      id: 2,
      task: ['신한은행', '1577-8000'],
    },
    {
      id: 3,
      task: ['SC제일은행', '1588-1599'],
    },
    {
      id: 4,
      task: ['IBK기업은행', '1566-2566'],
    },
    {
      id: 5,
      task: ['한국씨티은행', '1588-7000'],
    },
    {
      id: 6,
      task: ['Sh수협은행', '1588-1515'],
    },
    {
      id: 7,
      task: ['DGB대구은행', '1566-5050'],
    },
    {
      id: 8,
      task: ['광주은행', '1588-3388'],
    },
    {
      id: 9,
      task: ['하나은행', '1588-1111'],
    },
    {
      id: 10,
      task: ['NH농협은행', '1661-3000'],
    },
    {
      id: 11,
      task: ['우리은행', '1588-5000'],
    },
    {
      id: 12,
      task: ['카카오뱅크', '1599-3333'],
    },
    {
      id: 13,
      task: ['기술보증기금', '1544-1120'],
    },
    {
      id: 14,
      task: ['케이뱅크은행', '1522-1000'],
    },
    {
      id: 15,
      task: ['토스뱅크', '1661-7654'],
    },
    {
      id: 16,
      task: ['한국주택금융공사', '1688-8114'],
    },
    {
      id: 17,
      task: ['BNK경남은행', '1600-8585'],
    },
    {
      id: 18,
      task: ['제주은행', '1588-0079'],
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
