import Fcm from './test/Fcm';
import SignUpScreen from './screens/SignUpScreen';
import AuthStack from './navigations/AuthStack';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
