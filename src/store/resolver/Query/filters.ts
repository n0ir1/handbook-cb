import gql from 'graphql-tag';
import { BankInformation } from './listBank';
import { Resolver } from '../../resolvers';

export const fragmentFilters = gql`
  fragment FieldFilters on Filters {
    bik
    name
  }
`;

export const GET_FILTERS = gql`
  query Filters {
    filters @client {
      ...FieldFilters
    }
  }
  ${fragmentFilters}
`;

export type Filters = Pick<BankInformation, 'bik' | 'name'>;

export type FiltersQuery = {
  filters: Filters;
};

export const filters: Resolver<{}, {}, FiltersQuery> = (_, __, { cache }) =>
  cache.readQuery<FiltersQuery>({ query: GET_FILTERS });
