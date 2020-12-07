import React, {useEffect} from 'react';

import {InMemoryCache} from '@apollo/client/cache/inmemory/inMemoryCache';
import {ApolloClient} from '@apollo/client/core/ApolloClient';
import {setContext} from '@apollo/client/link/context';
import {split} from '@apollo/client/link/core';
import {createHttpLink} from '@apollo/client/link/http';
import {WebSocketLink} from '@apollo/client/link/ws';
import {ApolloProvider as Provider} from '@apollo/client/react';
import {getMainDefinition} from '@apollo/client/utilities/graphql/getFromAST';

import {navigate} from '#utils/Rootnavigator';

import {useAuth} from './Auth';

const httpLink = createHttpLink({
  uri: 'https://gql.admin-server-bons.com/gql/',
});

export default function ApolloProvider(props: any) {
  const {token, setAuth} = useAuth();

  const authLink = setContext(async (_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const wsLink = new WebSocketLink({
    uri: `wss://gql.admin-server-bons.com/gql/`,
    options: {
      reconnect: true,
      lazy: true,
      reconnectionAttempts: 1000,
      connectionParams: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const linkConcat = authLink.concat(httpLink);

  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    linkConcat
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return <Provider client={client} {...props} />;
}
