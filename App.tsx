import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import ApolloProvider from '#context/Apollo';
import {AuthProvider} from '#context/Auth';
import {StackChat} from '#navigation/main';
import {navigationRef} from '#utils/Rootnavigator';

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
        <NavigationContainer ref={navigationRef}>
          <StackChat />
        </NavigationContainer>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
