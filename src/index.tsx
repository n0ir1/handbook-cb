import React from 'react';
import { render } from 'react-dom';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { persistCache } from 'apollo-cache-persist';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';
import { resolvers, defaultState } from './store';
import { App } from './components/App';

const cache = new InMemoryCache();

cache.writeData({ data: defaultState });

persistCache({
  cache,
  storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
});

if (localStorage['apollo-cache-persist']) {
  const cacheData = JSON.parse(localStorage['apollo-cache-persist']);
  {
    cache.restore(cacheData);
  }
}

const client = new ApolloClient({
  cache,
  resolvers,
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app'),
);
