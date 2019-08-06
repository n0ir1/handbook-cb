import gql from 'graphql-tag';
import { Resolver } from '../../resolvers';
import {
  NonIdBankInformation,
  QueryListBank,
  GET_LIST_BANK,
  BankInformation,
  fragmentBankInformation,
} from '../Query/listBank';

export type UpdateBankVariables = {
  id: string;
  payload: NonIdBankInformation;
};

export const UPDATE_BANK = gql`
  mutation UpdateBank($id: String!, $payload: PayloadInput!) {
    updateBank(id: $id, payload: $payload) @client
  }
`;

export const updateBank: Resolver<{}, UpdateBankVariables, boolean> = (
  _,
  { id, payload },
  { cache },
) => {
  const cacheListBank = cache.readQuery<QueryListBank>({ query: GET_LIST_BANK });

  if (cacheListBank) {
    const isDuplicate = cacheListBank.listBank.some(
      item => item.id !== id && (item.name === payload.name || item.bik === payload.bik),
    );

    if (isDuplicate) {
      throw new Error('Банк с таким именем или номером уже существует');
    }
  }

  const cacheId = `Bank:${id}`;
  const bank = cache.readFragment<BankInformation>({
    fragment: fragmentBankInformation,
    id: cacheId,
  });
  const data = { ...bank, ...payload };

  cache.writeFragment({ fragment: fragmentBankInformation, id: cacheId, data });

  return true;
};
