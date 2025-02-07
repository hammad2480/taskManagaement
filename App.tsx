import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/Store/store';
import { PersistGate } from 'redux-persist/integration/react';
import MyStack from './src/Navigation/myStack';
import { NavigationContainer } from '@react-navigation/native';


const App = ()=>{
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
       <MyStack/>
       </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


export default App;
