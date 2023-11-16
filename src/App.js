import {useState} from 'react';
import {UserProvider} from './contexts/UserContext';
import Navigation from './navigations';
import StartLoading from './screens/StartLoading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);
  return (
    <UserProvider>{isLoading ? <StartLoading /> : <Navigation />}</UserProvider>
  );
};

export default App;
