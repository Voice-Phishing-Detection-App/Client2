import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

const RootStack = createStackNavigator();

const Navigation = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('foreground:', remoteMessage);
      // 여기에서 메시지를 처리하고 화면에 표시할 수 있습니다.
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Auth" component={AuthStack} />
        <RootStack.Screen name="Main" component={MainStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
