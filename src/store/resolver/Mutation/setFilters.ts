import gql from 'graphql-tag';
import { Resolver } from '../../resolvers';
import { Filters, fragmentFilters } from '../Query/filters';

export const SET_FILTERS = gql`
  mutation SetFilters($bik: String, $name: String) {
    setFilters(bik: $bik, name: $name) @client
  }
`;

export type SetFiltersVariables = Filters;

export const setFilters: Resolver<{}, SetFiltersVariables, boolean> = (
  _,
  { bik, name },
  { cache },
) => {
  const id = '$ROOT_QUERY.filters';

  const item = cache.readFragment({ fragment: fragmentFilters, id });

  cache.writeFragment({
    fragment: fragmentFilters,
    id,
    data: { ...item, bik, name },
  });

  return true;
};
