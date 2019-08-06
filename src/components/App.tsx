import React, { Fragment } from 'react';
import { ListBank } from './ListBank';
import { AddForm } from './AddForm';

export const App = () => (
  <Fragment>
    <AddForm />
    <ListBank />
  </Fragment>
);
