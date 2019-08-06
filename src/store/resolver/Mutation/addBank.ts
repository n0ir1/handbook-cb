import gql from 'graphql-tag';
import { v4 } from 'uuid';
import { QueryListBank, GET_LIST_BANK, NonIdBankInformation } from '../Query/listBank';
import { Resolver } from '../../resolvers';

export const ADD_BANK = gql`
  mutation addBank($input: InputAdd) {
    addBank(input: $input) @client
  }
`;

export type AddBankVariables = {
  input: NonIdBankInformation;
};

export const addBank: Resolver<{}, AddBankVariables, boolean> = (
  _,
  { input },
  { cache },
) => {
  const listBankCache = cache.readQuery<QueryListBank>({ query: GET_LIST_BANK });
  const newBank = { id: v4(), ...input, __typename: 'Bank' };

  if (listBankCache) {
    const item = listBankCache.listBank.find(
      item => item.bik === input.bik || item.name === input.name,
    );

    if (item) {
      throw new Error('Банк с таким номером или именем уже существует');
    }

    cache.writeData<QueryListBank>({
      data: { listBank: [...listBankCache.listBank, newBank] },
    });
  }

  return true;
};
