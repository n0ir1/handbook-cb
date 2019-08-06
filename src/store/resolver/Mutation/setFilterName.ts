import gql from 'graphql-tag';
import { Resolver } from '../../resolvers';
import { FilterNames } from '../Query/filterNames';

export const SET_FILTER_NAME = gql`
  mutation SetFilterName($bik: String, $name: String) {
    setFilterName(bik: $bik, name: $name) @client
  }
`;

const fragment = gql`
  fragment Names on FilterNames {
    bik
    name
  }
`;

export type FilterNamesVariables = FilterNames;

export const setFilterName: Resolver<{}, FilterNamesVariables, boolean> = (
  _,
  { bik, name },
  { cache },
) => {
  const id = '$ROOT_QUERY.filterNames';

  const item = cache.readFragment({ fragment, id });

  cache.writeFragment({
    fragment,
    id,
    data: { ...item, bik, name },
  });

  return true;
};
