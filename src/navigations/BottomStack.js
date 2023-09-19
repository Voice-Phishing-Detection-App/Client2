import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {PRIMARY, WHITE} from '../color';
// import HeaderRightButton from '../components/HeaderRightButton';
// import HeaderLeftButton from '../components/HeaderLeftButton';
// import {
//   AntDesign,
//   Ionicons,
//   MaterialIcons,
//   Feather,
// } from '@expo/vector-icons';

import SearchScreen from '../screens/SearchScreen';
import ReportScreen from '../screens/ReportScreen';
// import MyPageScreen from '../screens/MyPageScreen';

// import DoubtListScreen from '../screens/DoubtListScreen';
const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

const BottomStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: PRIMARY.DEFAULT,
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: {fontWeight: '700'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '피노키오',
          tabBarLabel: '홈',
          // headerRight: HeaderRightButton,
          // headerLeft: HeaderLeftButton,
          // tabBarIcon: ({ color, size }) => (
          //   <AntDesign name="home" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: '검색',
          headerShown: false,
          // tabBarIcon: ({color, size}) => (
          //   <Ionicons name="md-search-sharp" color={color} size={size} />
          // ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          title: '신고',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          // tabBarIcon: ({color, size}) => (
          //   <MaterialIcons name="policy" color={color} size={size} />
          // ),
        }}
      />
      {/* <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: '내 정보',
          title: '내 정보',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          // tabBarIcon: ({color, size}) => (
          //   <Feather name="user" color={color} size={size} />
          // ),
        }}
      /> */}
      {/* <Stack.Screen
        name="Doubt"
        component={DoubtListScreen}
        options={{ title: 'Doubt List' }}
      /> */}
    </Tab.Navigator>
  );
};
export default BottomStack;
