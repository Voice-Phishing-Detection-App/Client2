// import {UserProvider} from './contexts/UserContext';
// import Navigation from './navigations';

// const App = () => {
//   return (
//     <UserProvider>
//       <Navigation />
//     </UserProvider>
//   );
// };

// export default App;

import MainStack from './navigations/MainStack';
import AuthStack from './navigations/AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import File from './test/File';

const App = () => {
  return (
    // <NavigationContainer>
    //   <MainStack />
    // </NavigationContainer>
    <>
      <File />
    </>
  );
};

export default App;
