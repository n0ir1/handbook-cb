import gql from 'graphql-tag';
import { Resolver } from '../../resolvers';
import { SearchQuery, SEARCH_QUERY } from '../Query/searchQuery';

export const SET_SEARCH_QUERY = gql`
  mutation SetSearchQuery($query: String!) {
    setSearchQuery(query: $query) @client
  }
`;

export type SearchQueryVariables = {
  query: string;
};

export const setSearchQuery: Resolver<{}, SearchQueryVariables, boolean> = (
  _,
  { query },
  { cache },
) => {
  const searchQueryCache = cache.readQuery<SearchQuery>({ query: SEARCH_QUERY });

  if (searchQueryCache) {
    cache.writeData<SearchQuery>({ data: { searchQuery: query.toLowerCase() } });
  }

  return true;
};
