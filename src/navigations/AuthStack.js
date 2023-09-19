import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import {PRIMARY, WHITE} from '../color';
import FindIDScreen from '../screens/FindIDScreen';
import FindPassScreen from '../screens/FindPassScreen';
// import AgreeScreen from '../screens/AgreeScreen';
// import HeaderLeftBack from '../components/HeaderLeftBack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: WHITE},
        headerTitleAlign: 'left',
        headerTintColor: PRIMARY.DARK,
        headerTitleStyle: {fontWeight: '700'},
        headerBackTitleVisible: false,
        // headerLeft: HeaderLeftBack,
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Agree"
        component={AgreeScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: PRIMARY.LIGHT,
          },
        }}
      /> */}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{title: '회원가입'}}
      />
      <Stack.Screen
        name="FindId"
        component={FindIDScreen}
        options={{title: '아이디 찾기'}}
      />
      <Stack.Screen
        name="FindPass"
        component={FindPassScreen}
        options={{title: '비밀번호 찾기'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
