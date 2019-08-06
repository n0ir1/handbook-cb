import gql from 'graphql-tag';
import { Resolver } from '../../resolvers';
import { GET_LIST_BANK, QueryListBank } from '../Query/listBank';

export type DeleteVariables = {
  id: string;
};

export const DELETE_BANK = gql`
  mutation DeleteBank($id: String!) {
    deleteBank(id: $id) @client
  }
`;

export const deleteBank: Resolver<{}, DeleteVariables, boolean> = (
  _,
  { id },
  { cache },
) => {
  const listBankCache = cache.readQuery<QueryListBank>({ query: GET_LIST_BANK });

  if (listBankCache) {
    cache.writeData<QueryListBank>({
      data: { listBank: listBankCache.listBank.filter(item => item.id !== id) },
    });
  }
  return true;
};
