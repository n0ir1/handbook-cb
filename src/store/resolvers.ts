import ApolloClient, { Resolvers } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import * as Query from './resolver/Query';
import * as Mutation from './resolver/Mutation';

export type ResolverContext = {
  cache: ApolloClient<NormalizedCacheObject>;
};

export type Resolver<TObj, TArgs, TData> = (
  obj: TObj,
  args: TArgs,
  context: ResolverContext,
  info?: any,
) => TData | null;

export const resolvers: Resolvers = {
  Query,
  Mutation,
};
