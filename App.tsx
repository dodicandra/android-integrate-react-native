import React from 'react';

import {StatusBar} from 'react-native';

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
          <StatusBar
            animated
            translucent
            showHideTransition="fade"
            hidden
            backgroundColor="#03ACD2"
            barStyle="dark-content"
          />
          <StackChat />
        </NavigationContainer>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
