import React from 'react';
import { Provider } from 'react-redux';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import theme from './src/utils/theme';
import MainView from './src/components/MainView/MainView';

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
        <NavigationContainer theme={theme}>
          <MainView />
        </NavigationContainer>
      </Provider>
    );
  }
};

export default App;