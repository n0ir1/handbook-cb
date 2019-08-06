import gql from 'graphql-tag';
import { BankInformation } from './listBank';
import { Resolver } from '../../resolvers';

export const GET_FILTER_NAMES = gql`
  query FilterNames {
    filterNames @client {
      bik
      name
    }
  }
`;

export type FilterNames = Pick<BankInformation, 'bik' | 'name'>;

export type FilterNamesQuery = {
  filterNames: FilterNames;
};

export const filterNames: Resolver<{}, {}, FilterNamesQuery> = (_, __, { cache }) =>
  cache.readQuery<FilterNamesQuery>({ query: GET_FILTER_NAMES });
