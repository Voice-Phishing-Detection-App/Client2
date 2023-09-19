import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PRIMARY, WHITE} from '../color';
import BottomStack from './BottomStack';
import SetUpScreen from '../screens/SetUpScreen';
import DoubtListScreen from '../screens/DoubtListScreen';
// import PhisingListScreen from '../screens/PhisingListScreen';
// import CenterListScreen from '../screens/CenterListScreen';
// import EmergencyNumberScreen from '../screens/EmergencyNumberScreen';
// import MyReportListScreen from '../screens/MyReportListScreen';
// import ListDetailScreen from '../screens/ListDetailScreen';
import HeaderLeftBack from '../components/HeaderLeftBack';
// import SearchListScreen from '../screens/SearchListScreen';
const Stack = createNativeStackNavigator();
//로그인 후 컴포넌트
const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomHome"
      screenOptions={{
        contentStyle: {backgroundColor: WHITE},
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: {fontWeight: '700'},
        headerBackTitleVisible: false,
        headerLeft: HeaderLeftBack,
      }}>
      <Stack.Screen
        name="BottomHome"
        component={BottomStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetUp"
        component={SetUpScreen}
        options={{
          title: '알림',
          headerStyle: {
            backgroundColor: PRIMARY.LIGHT,
          },
          headerTintColor: PRIMARY.DARK,
          headerTitleStyle: {
            fontWeight: '900',
          },
        }}
      />
      <Stack.Screen
        name="Doubt"
        component={DoubtListScreen}
        options={{
          title: '의심 내역',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      {/* <Stack.Screen
        name="CenterList"
        component={CenterListScreen}
        options={{
          title: '피싱 도움',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
      {/* <Stack.Screen
        name="PhisingList"
        component={PhisingListScreen}
        options={{
          title: '피해 사례',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
      {/* <Stack.Screen
        name="ListDetail"
        component={ListDetailScreen}
        options={{
          title: '신고 기록',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
      {/* <Stack.Screen
        name="EmergencyNumber"
        component={EmergencyNumberScreen}
        options={{
          title: '긴급 연락처',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
      {/* <Stack.Screen
        name="MyReportList"
        component={MyReportListScreen}
        options={{
          title: '신고 기록',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
      {/* <Stack.Screen
        name="SearchList"
        component={SearchListScreen}
        options={{
          title: '신고 기록',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      /> */}
    </Stack.Navigator>
  );
};
export default MainStack;
