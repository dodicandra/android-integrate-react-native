import React, {useEffect, useState} from 'react';

import {createHttpLink, split, ApolloClient, ApolloProvider as Provider, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';

import {getToLocal} from '#utils/localstorage';

let httpLink = createHttpLink({
  uri: 'https://gql.admin-server-bons.com/',
});

export default function ApolloProvider(props: any) {
  const [state, setState] = useState('');

  const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists

    return {
      headers: {
        ...headers,
        authorization: state ? `Bearer ${state}` : '',
      },
    };

    // return the headers to the context so httpLink can read them
  });

  httpLink = authLink.concat(httpLink);

  const wsLink = new WebSocketLink({
    uri: `ws://gql.admin-server-bons.com/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: `Bearer ${state}`,
      },
    },
  });

  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    const getT = async () => {
      const token = await getToLocal('token');
      setState(token);
    };
    getT();
  });

  return <Provider client={client} {...props} />;
}
