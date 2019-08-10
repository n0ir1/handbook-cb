import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { Bank } from './Bank';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { QueryListBank, fragmentBankInformation } from '../store/resolver/Query/listBank';
import { SearchQuery } from '../store/resolver/Query/searchQuery';
import { FiltersQuery, fragmentFilters } from '../store/resolver/Query/filters';

type QueryListBankDetails = QueryListBank & SearchQuery & FiltersQuery;

const GET_BANKS_DETAILS = gql`
  query {
    listBank @client {
      id
      ...BankInformation
    }
    searchQuery @client
    filters @client {
      ...FieldFilters
    }
  }
  ${fragmentBankInformation}
  ${fragmentFilters}
`;

const searchInField = (value: string, key: string) => value.toLowerCase().includes(key);

const findAllFields = <T extends object>(data: T, searchKey: string) =>
  (Object.keys(data) as Array<keyof typeof data>).reduce(
    (acc, key) =>
      acc || (key !== '__typename' && searchInField(String(data[key]), searchKey)),
    false,
  );

const findByFields = <T extends object, K extends keyof T>(
  data: T,
  searchKey: string,
  fieldName: K,
) => searchInField(String(data[fieldName]), searchKey);

const searchByValue = <T extends object>(
  data: T[],
  key: string,
  fn: (value: T, key: string) => void,
) => (typeof key === 'string' && key ? data.filter(item => fn(item, key)) : data);

const filterByFields = <T extends object, K extends keyof T>(
  data: T[],
  keys: [K, string][],
  fn: (value: T, key: string, fieldName?: K) => void,
) =>
  keys instanceof Array
    ? [...keys].reduce(
        (acc, [key, value]) => (value ? acc.filter(item => fn(item, value, key)) : acc),
        data,
      )
    : data;

const Header = () => (
  <TableHead>
    <TableRow>
      <TableCell>#</TableCell>
      <TableCell>Бик</TableCell>
      <TableCell>Корр. счет</TableCell>
      <TableCell>Адрес</TableCell>
      <TableCell>Название</TableCell>
      <TableCell>Действие</TableCell>
    </TableRow>
  </TableHead>
);

export const ListBank = () => {
  const { loading, error, data } = useQuery<QueryListBankDetails>(GET_BANKS_DETAILS);
  if (loading || error || !data) return null;

  const {
    listBank,
    searchQuery,
    filters: { name, bik },
  } = data;

  const searchData = searchByValue(listBank, searchQuery, ({ id, ...bankInfo }, key) =>
    findAllFields(bankInfo, key),
  );

  const filterData = filterByFields(
    searchData,
    [['name', name], ['bik', bik]],
    ({ id, ...bankInfo }, key, fieldName) =>
      findByFields(bankInfo, key, fieldName as keyof typeof bankInfo),
  );

  return (
    <Paper elevation={2}>
      <SearchBar searchQuery={searchQuery} />
      <FilterBar bik={bik} name={name} />
      <Table>
        <Header />
        <TableBody>
          {filterData.length ? (
            filterData.map((bank, i) => (
              <TableRow key={bank.id}>
                <TableCell>{i + 1}</TableCell>
                <Bank data={bank} />
              </TableRow>
            ))
          ) : (
            <TableRow style={{ height: '300px' }}>
              <TableCell
                colSpan={6}
                style={{ textAlign: 'center', paddingTop: 0, paddingBottom: 0 }}
              >
                Отсутствуют данные для отображения
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
