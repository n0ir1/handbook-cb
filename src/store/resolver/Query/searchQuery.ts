import gql from 'graphql-tag';
import { Resolver } from '../../resolvers';

export const SEARCH_QUERY = gql`
  query SearchQuery {
    searchQuery @client
  }
`;

export type SearchQuery = {
  searchQuery: string;
};

export const searchQuery: Resolver<{}, {}, SearchQuery> = (_, __, { cache }) =>
  cache.readQuery<SearchQuery>({ query: SEARCH_QUERY });
