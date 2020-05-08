import React from 'react';
import { Provider } from 'react-redux';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import store from './src/redux/store';
import MainView from './src/components/MainView';

const App = () => {
  const [fontsLoaded] = useFonts({
    'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserratBold': require('./assets/fonts/Montserrat-Bold.ttf')
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
};

export default App;