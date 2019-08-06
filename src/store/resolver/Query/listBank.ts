import gql from 'graphql-tag';
import { Resolver } from '../../resolvers';

export type BankInformation = {
  id: string;
  bik: string;
  correspondentAccount: string;
  name: string;
  adress: string;
};

export type NonIdBankInformation = Omit<BankInformation, 'id'>;

export const fragmentBankInformation = gql`
  fragment BankInformation on Bank {
    bik
    correspondentAccount
    name
    adress
  }
`;

export const GET_LIST_BANK = gql`
  query ListBank {
    listBank @client {
      id
      ...BankInformation
    }
  }
  ${fragmentBankInformation}
`;

export type QueryListBank = {
  listBank: BankInformation[];
};

export const listBank: Resolver<{}, {}, QueryListBank> = (_, __, { cache }) =>
  cache.readQuery<QueryListBank>({ query: GET_LIST_BANK });
