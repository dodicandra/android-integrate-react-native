import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import ApolloProvider from '#context/Apollo';
import {StackChat} from '#navigation/main';
import {navigationRef} from '#utils/Rootnavigator';

const App = () => {
  return (
    <ApolloProvider>
      <NavigationContainer ref={navigationRef}>
        <StackChat />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
